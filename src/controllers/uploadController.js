/**
 * @file Contains upload controller.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const fs = require('fs')
const { findById } = require('./userController')
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
	const userDb = await findById(user.id)
	if (!userDb) return res.status(404).json({ error: 'User not found' })

	if (userDb.avatar.public_id !== 'avatar/default_avatar') {
		console.log('Deleting old avatar from cloudinary')
		const result = await deleteFile(userDb.avatar.public_id)
		console.log(result)
	}
	const { public_id, secure_url } = await uploadFile(image.tempFilePath)
	userDb.avatar = {
		public_id,
		secure_url,
	}
	await userDb.save()
	await fs.unlinkSync(image.tempFilePath)
	res.send('Avatar uploaded successfully')
}

module.exports = {
	uploadAvatar,
}
