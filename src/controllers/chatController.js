/**
 * @file Contains message model functions.
 * @author Manuel Cabral
 * @version 0.1.0
 */

// required modules
const { Chat } = require('../database').models
const { ObjectId } = require('mongoose').Types

/**
 *
 * @param {Object} data - The required chat data.
 * @param {Boolean} save - If true, the chat will be saved in the database.
 * @returns {Object} The new instanced chat.
 */
const createChat = async (data, save = true) => {
	const newChat = new Chat(data)
	if (save) await newChat.save()
	return newChat
}

/**
 * Deletes a chat by its id.
 * @param {String} chatId - The id of the chat to delete.
 * @returns {void} Nothing.
 */
const deleteChat = async (chatId) => await Chat.findByIdAndDelete(chatId)

/**
 * Find a chat by its id, users or name.
 * @param {Object} query - Data to find the chat, usually an id.
 * @returns {Object} The chat found.
 */
const findOne = async (query) => await Chat.findOne(query)

/**
 * Find all chats by optional params.
 * @param {Object} options - The options to find the chats.
 * @returns {Array} The chats found.
 */
const findAll = async (options) => {
	let { userId, isGroup, limit, skip } = options
	/**
	 * @todo
	 * Finish after and before options. This params depends on the frontend.
	 */
	return await Chat.find({
		users: { $in: [userId] },
		isGroup,
		//createdAt: { $gt: after, $lt: before },
	})
		.skip(skip)
		.limit(limit)
}

/**
 * Find a chat by its id.
 * @param {String} id - The id of the chat to find.
 * @returns {Object} The chat found, or null if not found.
 */
const findById = async (id) => {
	if (!ObjectId.isValid(id)) return null
	return await Chat.findById(id)
}

/**
 * Add a message to a chat.
 * @param {String} chatId - The id of the chat to add the message to.
 * @param {String} messageId - The id of the message to add to the chat.
 * @returns {void} Nothing.
 */
const addMessage = async (chatId, messageId) => {
	const chat = await findById(chatId)
	chat.messages.push(messageId)
	await chat.save()
}

/**
 * Check if a message belongs to a chat.
 * @param {String} chatId - The id of the chat to check.
 * @param {String} messageId - The id of the message to check.
 * @returns {Boolean} True if the message belongs to the chat, false otherwise.
 */
const isMessageInChat = async (chatId, messageId) => {
	const chat = await findById(chatId)
	return chat.messages.includes(messageId)
}

/**
 * Check if a user is in a chat.
 * @param {String} chatId - The id of the chat to check.
 * @param {String} userId - The id of the user to check in the chat.
 * @returns {Boolean} True if the user is in the chat, false otherwise.
 */
const isUserInChat = async (chatId, userId) => {
	const chat = await findById(chatId)
	return chat.users.includes(userId)
}

/**
 * Check if a user is admin in a chat.
 * @param {String} chatId - The id of the chat to check.
 * @param {String} userId - The id of the user to check if is admin.
 * @returns {Boolean} True if the user is admin, false otherwise.
 */
const isUserAdmin = async (chatId, userId) => {
	const chat = await findById(chatId)
	return chat.admins.includes(userId)
}

/**
 * Check if a user is the owner of a chat.
 * @param {String} chatId - The id of the chat to check.
 * @param {String} userId - The id of the user to check if is owner.
 * @returns {Boolean} True if the user is owner, false otherwise.
 */
const isUserOwner = async (chatId, userId) => {
	const chat = await findById(chatId)
	if (!chat.owner) return true
	return chat.owner.equals(userId)
}

module.exports = {
	createChat,
	deleteChat,
	findById,
	findOne,
	findAll,
	addMessage,
	isMessageInChat,
	isUserInChat,
	isUserAdmin,
	isUserOwner,
}
