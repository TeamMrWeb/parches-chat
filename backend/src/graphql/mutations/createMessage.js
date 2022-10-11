/**
 * @file Contains chat mutation.
 * @author Manuel Cabral
 * @version 0.1.1
 */

// required modules
const { MessageType } = require('../types')
const { pubsub, events } = require('../pubsub')
const createNewMessage =
	require('../../controllers/messageController').createMessage
const { findById, addMessage } = require('../../controllers/chatController')
const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

// arguments object
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
	if (!user) throw new Error('Tienes que estar logeado para crear un mensaje.')
	const chat = await findById(args.chatId)
	if (!chat) throw new Error('Chat no encontrado.')
	if (args.text.length > 4500) throw new Error('El mensaje es muy largo.')
	if (args.text.length < 1) throw new Error('El mensaje es muy corto.')
	const newMessage = await createNewMessage({
		text: args.text,
		image: args.image,
		author: user.id,
		seen: [],
	})
	await addMessage(args.chatId, newMessage._id)

	pubsub.publish(events.MESSAGE_ADDED, { messageAdded: newMessage })
	pubsub.publish(`${events.CHAT_MESSAGE_ADDED}:${args.chatId}`, {
		chatMessageAdded: newMessage,
	})
	for (const userId of chat.users) {
		if (userId !== user.id) {
			pubsub.publish(`${events.USER_MESSSAGE_NOTIFICATION}:${userId}`, {
				userMessageNotification: newMessage,
			})
		}
	}
	return newMessage
}

// mutation object
const createMessage = {
	type: MessageType,
	description: 'Create a new message in a chat.',
	args,
	resolve,
}

module.exports = createMessage
