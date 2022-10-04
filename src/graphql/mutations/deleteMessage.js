/**
 * @file Contains the deletion message mutation.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLNonNull, GraphQLID } = require('graphql')
const { isMessageInChat } = require('../../controllers/chatController')
const {
	findById,
	isMessageAuthor,
} = require('../../controllers/messageController')

const deleteMessageById =
	require('../../controllers/messageController').deleteMessage

const args = {
	chatId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the chat that contains the message.',
	},
	messageId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the message to delete.',
	},
}

/**
 * Resolve a message deletion.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @param {Object} context - Context object of the request.
 * @returns {Object} - A message object type.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	const { chatId, messageId } = args
	if (!user)
		throw new Error('Tienes que estar logeado para eliminar un mensaje.')
	if (!chatId) throw new Error('No se ha especificado el chat del mensaje.')
	if (!messageId)
		throw new Error('No se ha especificado el mensaje a eliminar.')

	if (!(await isMessageInChat(chatId, messageId)))
		throw new Error('El mensaje no pertenece al chat especificado.')

	const message = await findById(messageId)
	if (!message) throw new Error('El mensaje que buscas no existe.')

	if (!(await isMessageAuthor(messageId, user.id)))
		throw new Error('No eres el autor de este mensaje.')

	const deletedMessage = await deleteMessageById(messageId)
	return deletedMessage._id
}

// mutation object
const deleteMessage = {
	type: GraphQLID,
	description: 'Delete a message in a chat by id.',
	args,
	resolve,
}

module.exports = deleteMessage
