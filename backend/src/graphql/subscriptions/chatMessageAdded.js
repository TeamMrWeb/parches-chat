/**
 * @file Contains chat message added subscription.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLID } = require('graphql')
const { pubsub, events } = require('../pubsub')
const { MessageType } = require('../types')

// arguments object
const args = {
	chatId: {
		type: GraphQLID,
		description: 'The id of the chat to subscribe',
	},
}

/**
 * Subscribes to CHAT_MESSAGE_ADDED event.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 */
const subscribe = (_, args) =>
	pubsub.asyncIterator(`${events.CHAT_MESSAGE_ADDED}:${args.chatId}`)

// subscription object
const chatMessageAdded = {
	type: MessageType,
	description: 'Subscription for new messages in a specific chat',
	args,
	subscribe,
}

module.exports = chatMessageAdded
