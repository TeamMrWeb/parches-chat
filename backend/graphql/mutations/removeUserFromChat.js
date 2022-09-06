/**
 * @file Contains removeUserFromChat mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLNonNull, GraphQLID } = require('graphql')
const { ChatType } = require('../types')
const findUserById = require('../../controllers/userController').findById
const findChatById = require('../../controllers/chatController').findById

// arguments object
const args = {
	chatId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the chat.',
	},
	userId: {
		type: GraphQLID,
		description:
			'The id of the user, if not provided, the current user will be used.',
	},
}

/**
 * Resolve removing a user from a chat.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to the query.
 * @param {Object} context - The context object.
 * @returns {Object} The chat object.
 */
const resolve = async (_, args, context) => {
	const chat = await findChatById(args.chatId)
	if (!chat) throw new Error('Chat no encontrado.')

	let userId = args.userId
	if (!userId) {
		const { user } = context
		if (!user)
			throw new Error('Tienes que estar logueado para obtener un usuario.')
		userId = user.id
	}
	const user = await findUserById(userId)
	if (!user) throw new Error('User no encontrado.')

	// check if the user is already in the chat
	const userInChat = chat.users.find((u) => u.id === user.id)
	if (!userInChat) throw new Error('El usuario no está en el chat.')

	chat.users = chat.users.filter((u) => u.id !== user.id)
	len = chat.users.length
	if (len === 0) {
		await chat.remove()
		return null
	}

	if (len < 3) chat.isGroup = false

	await chat.save()
	return chat
}

// mutation object
const removeUserFromChat = {
	type: ChatType,
	description: 'Remove a user from a chat.',
	args,
	resolve,
}

module.exports = removeUserFromChat
