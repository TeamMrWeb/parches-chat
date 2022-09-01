/**
 * @file Get all chats, from the current user.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { ChatType } = require('../types')
const { findAllChatsByUser } = require('../../controllers/chatController')
const {
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require('graphql')

const args = {
	userId: {
		type: GraphQLID,
		description: 'The id of the user to get the chats from.',
	},
	limit: {
		type: GraphQLInt,
		description: 'The limit of chats to return.',
	},
	skip: {
		type: GraphQLInt,
		description: 'The number of chats to skip.',
	},
	before: {
		type: GraphQLString,
		description: 'The date to get the chats before.',
	},
	after: {
		type: GraphQLString,
		description: 'The date to get the chats after.',
	},
	isGroup: {
		type: GraphQLBoolean,
		description: 'If the chat is a group chat.',
	},
}

/**
 *
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to the query.
 * @param {Object} context - The context object.
 * @returns {Object} The chat object.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	if (!user) throw new Error('You are not authenticated.')
	const userId = args.userId || user.id
	const chats = await findAllChatsByUser(userId, {
		limit: args.limit || 10,
		skip: args.skip || 0,
		before: args.before || null,
		after: args.after || null,
		isGroup: args.isGroup || false,
	})
	return chats
}

const getAllChats = {
	type: new GraphQLList(ChatType),
	description: 'Get all chats, from the current user.',
	args,
	resolve,
}

module.exports = getAllChats
