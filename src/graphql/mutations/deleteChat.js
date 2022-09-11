/**
 * @file Contains the deletion chat mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
const { ChatType } = require('../types')
const deleteChatById = require('../../controllers/chatController').deleteChat
const {
	isUserAdmin,
	isUserOwner,
	findById,
} = require('../../controllers/chatController')

// arguments object
const args = {
	chatId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the chat to delete.',
	},
}

/**
 * Resolve a chat deletion.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @param {Object} context - Context object of the request.
 * @returns {String} - A string with the id of the deleted chat.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	const { chatId } = args
	if (!user) throw new Error('Tienes que estar logeado para eliminar un chat.')
	if (!chatId) throw new Error('No se ha especificado el chat a eliminar.')

	const chat = await findById(chatId)
	if (!chat) throw new Error('El chat que buscas no existe.')

	if (!(await isUserAdmin(chatId, user.id)))
		throw new Error('No eres administrador de este chat.')

	if (!(await isUserOwner(chatId, user.id)))
		throw new Error('No eres el propietario de este chat.')

	const deletedChat = await deleteChatById(chatId)
	return deletedChat._id
}

// mutation object
const deleteChat = {
	type: GraphQLString,
	description: 'Delete a chat',
	args,
	resolve,
}

module.exports = deleteChat
