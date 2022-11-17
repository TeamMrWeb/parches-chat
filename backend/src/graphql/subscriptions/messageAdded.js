/**
 * @file Contains global message added subscription.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { pubsub, events } = require('../pubsub')
const { MessageType } = require('../types')

// arguments object
const args = {}

/**
 * Subscribes to MESSAGE_ADDED event.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 */
const subscribe = (_, args) => pubsub.asyncIterator(events.MESSAGE_ADDED)

// subscription object
const messageAdded = {
	type: MessageType,
	description: 'Subscription for new messages',
	args,
	subscribe,
}

module.exports = messageAdded
