/**
 * @file Contains chat query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const { ChatType } = require('../types')
const { findOne } = require('../../controllers/chatController')

const args = {
	through: {
		type: GraphQLString,
		description: 'Field to search through',
	},
	values: {
		type: new GraphQLList(GraphQLID),
		description: 'Values to search for',
	},
}

const resolve = async (_, args) => {
	return await findOne(args)
}

const chat = {
	type: ChatType,
	description: 'Get a chat by id, name or users',
	args,
	resolve,
}

module.exports = chat
