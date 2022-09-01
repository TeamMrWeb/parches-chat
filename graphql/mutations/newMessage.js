/**
 * @file Contains chat mutation.
 * @author Manuel Cabral
 * @version 0.0.7
 */

// required modules
const { MessageType } = require('../types')
const { createMessage } = require('../../controllers/messageController')
const { findById, addMessage } = require('../../controllers/chatController')
const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

// mutation object
const args = {
	chatId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the chat.',
	},
	text: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The text of the message.',
	},
	image: {
		type: GraphQLString,
		description: 'The image of the message.',
	},
}

/**
 * Resolve a new message.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @param {Object} context - Context object of the request.
 * @returns {Object} - A message object type.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	if (!user) throw new Error('You are not logged in')
	const chat = await findById(args.chatId)
	if (!chat) throw new Error('Chat not found')
	if (args.text.length > 4500) throw new Error('Message too long')
	if (args.text.length < 1) throw new Error('Message must have a text')
	const newMessage = await createMessage({
		text: args.text,
		image: args.image,
		author: user.id,
		seen: [],
	})
	await addMessage(args.chatId, newMessage._id)
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
