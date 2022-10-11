/**
 * @file Contains chat query.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const { GraphQLID, GraphQLNonNull } = require('graphql')
const { ChatType } = require('../types')
const { findById } = require('../../controllers/chatController')

const args = {
	id: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The id of the chat to find.',
	},
}

/**
 * Find a chat by id.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to the query.
 * @returns {Object} The chat object.
 */
const resolve = async (_, args) => {
	const chat = await findById(args.id)
	if (!chat) throw new Error('Chat not found.')
	return chat
}

// query object
const chat = {
	type: ChatType,
	description: 'Get a chat by id.',
	args,
	resolve,
}

module.exports = chat
