/**
 * @file Contains chat create mutation.
 * @author Manuel Cabral
 * @contributor Leo Araya
 * @version 0.1.0
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
		description:
			'If the chat is secure or not. If is secure the chat will have a owner.',
	},
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
	if (!user) throw new Error('Tienes que estar logeado para crear un chat.')

	const author = await findById(user.id)
	if (!author) throw new Error('Usuario logeado no encontrado')

	// check if any userid is duplicated
	const anyOneIsDuplicate = args.usersId.some(
		(id, index) => args.usersId.indexOf(id) !== index
	)
	if (anyOneIsDuplicate)
		throw new Error('No puedes agregar dos veces el mismo usuario.')

	// check if exists the users
	const users = await findMany(args.usersId)
	if (!users) throw new Error('Alguno de los usuarios no existe.')

	if (users.length < 2)
		throw new Error('El chat debe tener al menos 2 usuarios.')

	if (args.name < 3)
		throw new Error('El nombre del chat debe tener al menos 3 caracteres.')

	const isGroup = users.length > 2

	return await createChat({
		name: args.name,
		isGroup,
		messages: [],
		admins: isGroup ? [author.id] : [],
		users: args.usersId,
		secure: args.secure,
		ownerId: args.secure && isGroup ? author.id : null,
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
