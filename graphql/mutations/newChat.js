/**
 * @file Contains chat create mutation.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const { createChat } = require('../../controllers/chatController')
const { findMany } = require('../../controllers/userController')
const { ChatType } = require('../types')
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = require('graphql')

// arguments object
const args = {
	name: { type: new GraphQLNonNull(GraphQLString) },
	users: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
}

/**
 * Resolve a new chat.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @param {Object} context - Context object.
 * @returns {Object} - A chat object type.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	if (!user) throw new Error('You must be logged in to create a chat')
	const users = await findMany(args.users)
	if (!users) throw new Error('Invalid users')
	if (users.length < 2) throw new Error('Chat must have at least 2 users')
	return await createChat(args)
}

// mutation object
const newChat = {
	type: ChatType,
	description: 'Create a new chat',
	args,
	resolve,
}

module.exports = newChat
