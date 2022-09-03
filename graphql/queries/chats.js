/**
 * @file Contains chats query.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const {
	GraphQLList,
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
} = require('graphql')
const { ChatType } = require('../types')
const { findAll } = require('../../controllers/chatController')

const args = {
	userId: {
		type: GraphQLID,
		description:
			'The id of the user to get the chats from. If not provided, logged user will be used.',
	},
	isGroup: {
		type: GraphQLBoolean,
		description: 'If the chat is a group or not.',
	},
	skip: {
		type: GraphQLInt,
		description: 'The number of chats to skip.',
	},
	limit: {
		type: GraphQLInt,
		description: 'The limit of chats to return.',
	},
}

const resolve = async (_, args, context) => {
	let userId = args.userId
	if (!userId) {
		const { user } = context
		if (!user)
			throw new Error('You must be logged in to get chats or provide a userId.')
		userId = user.id
	}
	console.log(userId)
	return await findAll({
		userId,
		skip: args.skip || 0,
		limit: args.limit || 0,
		isGroup: args.isGroup || false,
	})
}

const chats = {
	type: new GraphQLList(ChatType),
	description: 'List of all chats',
	args,
	resolve,
}

module.exports = chats
