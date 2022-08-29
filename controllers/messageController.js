/**
 * @file Contains message model functions.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { Message } = require('../models')
const { ToObjectId } = require('../utils/cast')

/**
 * Creates a new message.
 * @param {Object} data - The required message data.
 * @param {Boolean} save - If true, the message will be saved in the database.
 * @returns
 */
const createMessage = async (data, save = true) => {
	data.authorId = ToObjectId(data.authorId)
	const newMessage = new Message(data)
	if (save) await newMessage.save()
	return await newMessage.populate('author')
}

/**
 * Find a message by its id.
 * @param {Object} query - Data to find the message, usually an id.
 * @returns {Object} The message found.
 */
const findOne = async (data) => await Message.findOne(data).populate('author')

module.exports = {
	createMessage,
	findOne,
}
