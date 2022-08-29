/**
 * @file Contains chats query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLList } = require('graphql')
const { ChatType } = require('../types')
const { findAll } = require('../../controllers/chatController')

const resolve = async () => {
	return await findAll()
}

const chats = {
	type: new GraphQLList(ChatType),
	description: 'List of all chats',
	resolve,
}

module.exports = chats
