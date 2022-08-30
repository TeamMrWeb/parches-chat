/**
 * @file Contains chat create mutation.
 * @author Manuel Cabral
 * @version 0.0.3
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

const args = {
	name: { type: new GraphQLNonNull(GraphQLString) },
	users: { type: new GraphQLList(GraphQLID) },
}

const resolve = async (_, args) => {
	const users = await findMany(args.users)
	if (!users) throw new Error('Invalid users')
	if (users.length < 2) throw new Error('Chat must have at least 2 users')
	return await createChat(args)
}

const newChat = {
	type: ChatType,
	description: 'Create a new chat',
	args,
	resolve,
}

module.exports = newChat
