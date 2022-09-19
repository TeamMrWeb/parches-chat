/**
 * @file Contains PubSub instance and event emitters.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { PubSub } = require('graphql-subscriptions')

// create a pubsub instance
const pubsub = new PubSub()

// event emitters
const events = {
	MESSAGE_ADDED: 'MESSAGE_ADDED',
	CHAT_MESSAGE_ADDED: 'CHAT_MESSAGE_ADDED',
}

module.exports = {
	pubsub,
	events,
}