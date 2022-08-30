/**
 * @file Contains message model functions.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const { Chat } = require('../models')
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
 * Find a chat by its id, users or name.
 * @param {Object} query - Data to find the chat, usually an id.
 * @returns {Object} The chat found.
 */
const findOne = async (query) => {
	if (query.through === 'users')
		query.values = query.values.map((id) => ToObjectId(id))
	const { through, values } = query
	const chats = await Chat.findOne({ through: { $in: values } })
		.populate('users')
		// is this line necessary? :D
		.populate({ path: 'messages', populate: { path: 'author', model: 'User' } })
	return chats
}

/**
 * Find all chats.
 * @returns {Array} The chats found.
 */
const findAll = async () => await Chat.find()

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

module.exports = {
	createChat,
	findById,
	findOne,
	findAll,
	addMessage,
}
