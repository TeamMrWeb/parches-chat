/**
 * @file Contains chat mutation.
 * @author Manuel Cabral
 * @version 0.0.5
 */

// required modules
const { MessageType } = require('../types')
const { createMessage } = require('../../controllers/messageController')
const { findOne, addMessage } = require('../../controllers/chatController')
const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

// mutation object
const args = {
	chatId: { type: new GraphQLNonNull(GraphQLID) },
	text: { type: new GraphQLNonNull(GraphQLString) },
	image: { type: new GraphQLNonNull(GraphQLString) },
}

/**
 * Resolve a new message.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @param {Object} req - Context object of the request.
 * @returns {Object} - A message object type.
 */
const resolve = async (_, args, req) => {
	const { user } = req
	if (!user) throw new Error('You are not logged in')
	if (!(await findOne({ through: 'id', values: [args.chatId] })))
		throw new Error('Chat not found')
	args['author'] = user.id
	const newMessage = await createMessage(args)
	await addMessage(args.chatId, newMessage.id)
	return newMessage
}

// mutation object
const newMessage = {
	type: MessageType,
	description: 'Create a new message',
	args,
	resolve,
}

module.exports = newMessage
