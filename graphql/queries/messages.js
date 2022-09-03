/**
 * @file Contains messages query.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const MessageType = require('../types/messageType')
const { GraphQLList, GraphQLInt, GraphQLID } = require('graphql')
const { findMany } = require('../../controllers/messageController')

const args = {
	ids: {
		type: new GraphQLList(GraphQLID),
		description:
			'The ids of the messages, if not provided, parent messages will be used.',
	},
	limit: {
		type: GraphQLInt,
		description: 'The limit of messages to return.',
	},
	skip: {
		type: GraphQLInt,
		description: 'The number of messages to skip.',
	},
}

const resolve = async (parent, args) => {
	let ids = args.ids
	if (!ids) {
		if (!parent) throw new Error('You must provide a parent message or ids.')
		ids = parent.messages
	}
	return await findMany(ids, {
		limit: args.limit || 0,
		skip: args.skip || 0,
	})
}

const messages = {
	type: new GraphQLList(MessageType),
	description:
		'Get messages by ids, if not provided, parent messages will be used.',
	args,
	resolve,
}

module.exports = messages
