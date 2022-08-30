/**
 * @file Contains chat mutation.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const { createMessage } = require('../../controllers/messageController')
const { findOne, addMessage } = require('../../controllers/chatController')
const { MessageType } = require('../types')
const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

const args = {
	chatId: { type: GraphQLNonNull(GraphQLID) },
	text: { type: GraphQLNonNull(GraphQLString) },
	image: { type: GraphQLNonNull(GraphQLString) },
}

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

const newMessage = {
	type: MessageType,
	description: 'Create a new message',
	args,
	resolve,
}

module.exports = newMessage
