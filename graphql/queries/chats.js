/**
 * @file Contains chats query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLList, GraphQLBoolean } = require('graphql')
const { ChatType } = require('../types')
const { findAll } = require('../../controllers/chatController')

const args = {
	isGroup: {
		type: GraphQLBoolean,
		description: 'If the chat is a group or not.',
	},
}

const resolve = async (_, args) => {
	const options = args.isGroup === undefined ? {} : { isGroup: args.isGroup }
	console.log(options)
	return await findAll(options)
}

const chats = {
	type: new GraphQLList(ChatType),
	description: 'List of all chats',
	args,
	resolve,
}

module.exports = chats
