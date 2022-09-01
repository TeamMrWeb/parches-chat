/**
 * @file Contains chat create mutation.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const { createChat } = require('../../controllers/chatController')
const { findMany, findById } = require('../../controllers/userController')
const { ChatType } = require('../types')
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require('graphql')

// arguments object
const args = {
	name: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The name of the chat.',
	},
	usersId: {
		type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
		description: 'The id of the users of the chat.',
	},
	secure: {
		type: GraphQLBoolean,
		description: 'If the chat is secure'
	}
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

	const users = await findMany(args.usersId)
	const author = await findById(user.id)
	if (!author) throw new Error('Invalid author id')
	if (!users) throw new Error('Invalid users id')

	if (users.length < 2) throw new Error('Chat must have at least 2 users')
	const isGroup = users.length > 2

	return await createChat({
		name: args.name,
		isGroup,
		messages: [],
		admins: isGroup ? [author.id] : [],
		users: args.usersId,
		secure: args.secure,
		ownerId: args.secure && isGroup ? author.id : null
	})
}

// mutation object
const newChat = {
	type: ChatType,
	description: 'Create a new chat',
	args,
	resolve,
}

module.exports = newChat
