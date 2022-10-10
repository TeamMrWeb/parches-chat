/**
 * @file Contains upload controller.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const fs = require('fs')
const { PROFILE_AVATAR_FOLDER, CHAT_AVATAR_FOLDER } =
	require('../config').CLOUDINARY
const findUserById = require('./userController').findById
const findChatById = require('./chatController').findById
const { uploadFile, deleteFile } = require('../services/cloudinary')

/**
 * Uploads a avatar to the server, then uploads it to cloudinary.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns
 */
const uploadAvatar = async (req, res) => {
	if (!req.files) return res.status(400).json({ error: 'No files provided' })

	const { image } = req.files
	const { user } = req

	if (!user) return res.status(401).json({ error: 'Unauthorized' })
	if (!image) return res.status(400).json({ error: 'No image provided' })
	const userDb = await findUserById(user.id)
	if (!userDb) return res.status(404).json({ error: 'User not found' })

	if (userDb.avatar.public_id !== 'avatar/default_avatar') {
		console.log('Deleting old avatar from cloudinary')
		const result = await deleteFile(userDb.avatar.public_id)
		console.log(result)
	}
	const { public_id, secure_url } = await uploadFile(
		image.tempFilePath,
		PROFILE_AVATAR_FOLDER
	)
	userDb.avatar = {
		public_id,
		secure_url,
	}
	await userDb.save()
	await fs.unlinkSync(image.tempFilePath)
	return res
		.status(200)
		.json({ message: 'Avatar uploaded/updated successfully' })
}

const uploadChatImage = async (req, res) => {
	if (!req.files) return res.status(400).json({ error: 'No files provided' })
	const { image } = req.files
	const { user } = req
	const { id } = req.params
	if (!id) return res.status(400).json({ error: 'No chat id provided' })
	if (!user) return res.status(401).json({ error: 'Unauthorized' })
	if (!image) return res.status(400).json({ error: 'No image provided' })
	const userDb = await findUserById(user.id),
		chatDb = await findChatById(id)
	if (!userDb || !chatDb)
		return res.status(404).json({ error: 'User or chat not found' })
	if (!chatDb.users.includes(userDb._id))
		return res.status(401).json({ error: 'Your not have access to this chat' })
	if (chatDb.avatar.public_id !== 'chat/default_chat_image') {
		console.log('Deleting old chat image from cloudinary')
		await deleteFile(chatDb.avatar.public_id)
	}
	const { public_id, secure_url } = await uploadFile(
		image.tempFilePath,
		CHAT_AVATAR_FOLDER
	)
	chatDb.avatar = {
		public_id,
		secure_url,
	}
	await chatDb.save()
	await fs.unlinkSync(image.tempFilePath)
	return res.status(200).json({ message: 'Chat image updated successfully' })
}

module.exports = {
	uploadAvatar,
	uploadChatImage,
}
