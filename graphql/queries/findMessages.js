/**
 * @file Contains findMessages query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const MessageType = require('../types/messageType')
const { GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')
const { findMany } = require('../../controllers/messageController')

const args = {
	ids: {
		type: new GraphQLList(GraphQLInt),
		description: 'The ids of the messages.',
	},
	limit: {
		type: new GraphQLNonNull(GraphQLInt),
		description: 'The limit of messages to return.',
	},
	skip: {
		type: new GraphQLNonNull(GraphQLInt),
		description: 'The number of messages to skip.',
	},
}

const resolve = async (parent, args) => {
	const ids = args.ids || parent.messages
	if (!args.ids) return await findMany(ids, args.limit, args.skip)
}

const findMessages = {
	type: new GraphQLList(MessageType),
	description: 'The messages query.',
	args,
	resolve,
}

module.exports = findMessages
