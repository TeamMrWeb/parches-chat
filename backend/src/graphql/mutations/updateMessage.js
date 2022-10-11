/**
 * @file Contains the update message mutation.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')
const { MessageType } = require('../types')
const { findById } = require('../../controllers/messageController')
const updateMessageById =
	require('../../controllers/messageController').updateMessage
// arguments object
const args = {
	messageId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the message.',
	},
	text: {
		type: GraphQLString,
		description: 'The new text of the message.',
	},
}

/**
 * Resolve edition message mutation.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to be updated.
 * @param {Object} context - The context object of the request.
 * @returns {Object} - The updated message object.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	const { messageId } = args
	if (!user) throw new Error('Tienes que estar logeado para editar un mensaje.')
	if (!messageId)
		throw new Error('No se ha pasado el id del mensaje para actualizar')
	const message = await findById(messageId)
	if (!message) throw new Error('No se ha encontrado el mensaje.')
	if (message.author.toString() !== user.id)
		throw new Error('No tienes permiso para editar este mensaje.')
	return await updateMessageById(messageId, {
		text: args.text,
		edited: true,
	})
}

// mutation object
const updateMessage = {
	type: MessageType,
	description: 'Update a message by id.',
	args,
	resolve,
}

module.exports = updateMessage
