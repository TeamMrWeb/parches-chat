/**
 * @file Contains user message notification subscription.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLID } = require('graphql')
const { pubsub, events } = require('../pubsub')
const { MessageType } = require('../types')

// arguments object
const args = {
	userId: {
		type: GraphQLID,
		description: 'The id of the user to subscribe',
	},
}

/**
 * Subscribes to USER_MESSSAGE_NOTIFICATION event.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 */
const subscribe = (_, args) =>
	pubsub.asyncIterator(`${events.USER_MESSSAGE_NOTIFICATION}:${args.userId}`)

// subscription object
const userMessageNotification = {
	type: MessageType,
	description: 'Subscription for message notifications for a specific user',
	args,
	subscribe,
}

module.exports = userMessageNotification
