/**
 * @file Contains all GraphQL subscriptions.
 * @author Manuel Cabral
 * @version 0.0.2
 * @note Pass all subscriptions objects to one file in /subscriptions directory.
 */

// required modules
const { GraphQLID } = require('graphql')
const { pubsub, events } = require('./pubsub')
const { MessageType } = require('./types')

// message subscription object
const messageAdded = {
	type: MessageType,
	description: 'Subscription for new messages',
	subscribe: () => pubsub.asyncIterator(events.MESSAGE_ADDED),
}

// chat message subscription object
const chatMessageAdded = {
	type: MessageType,
	description: 'Subscription for new messages in a chat',
	args: {
		chatId: {
			type: GraphQLID,
			description: 'The id of the chat to subscribe',
		},
	},
	// parent not used
	subscribe: (_, args) =>
		pubsub.asyncIterator(`${events.CHAT_MESSAGE_ADDED}:${args.chatId}`),
}

module.exports = {
	messageAdded,
	chatMessageAdded,
}
