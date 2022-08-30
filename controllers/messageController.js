/**
 * @file Contains message model functions.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { Message } = require('../models')
const { ObjectId } = require('mongoose').Types

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
	return newMessage
}

/**
 * Find a message by its id.
 * @param {Object} query - Data to find the message, usually an id.
 * @returns {Object} The message found.
 */
const findOne = async (data) => await Message.findOne(data).populate('author')

/**
 * Find a message by its id.
 * @param {String} id - The id of the message to find.
 * @returns {Object} The message found, or null if not found.
 */
const findById = async (id) => {
	if (!ObjectId.isValid(id)) return null
	return await Message.findById(id)
}

/**
 * Find many messages by their ids.
 * @param {Array} ids - The ids of the messages to find.
 * @returns {Array} The messages found, or null if not found an id.
 */
const findMany = async (ids, limit, skip) => {
	for (const id of ids) if (!ObjectId.isValid(id)) return null
	const mapIds = ids.map((id) => ObjectId(id))
	return await Message.find({ _id: { $in: mapIds } })
		.skip(skip)
		.limit(limit)
}

module.exports = {
	createMessage,
	findOne,
	findMany,
	findById,
}
