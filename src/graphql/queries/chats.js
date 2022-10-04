/**
 * @file Contains chats query.
 * @author Manuel Cabral
 * @version 0.0.4
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

// arguments object
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

/**
 * Resolve the chats query.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to the query.
 * @param {Object} context - The context object of the request.
 * @returns {Object} List of chats object.
 */
const resolve = async (_, args, context) => {
	let userId = args.userId
	if (!userId) {
		const { user } = context
		if (!user)
			throw new Error('You must be logged in to get chats or provide a userId.')
		userId = user.id
	}
	return await findAll({
		userId,
		skip: args.skip || 0,
		limit: args.limit || 0,
		isGroup: args.isGroup || false,
	})
}

// query object
const chats = {
	type: new GraphQLList(ChatType),
	description: 'Get chats from a user by its id.',
	args,
	resolve,
}

module.exports = chats
