/**
 * @file Contains all GraphQL subscriptions.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { pubsub, events } = require('./pubsub')
const { MessageType } = require('./types')

// subscription objects
const messageAdded = {
	type: MessageType,
	description: 'Subscription for new messages',
	subscribe: () => pubsub.asyncIterator(events.MESSAGE_ADDED),
}

module.exports = {
	messageAdded,
}
