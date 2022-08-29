/**
 * @file Contains user query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLID, GraphQLString } = require('graphql')
const { UserType } = require('../types')
const { findOne } = require('../../controllers/userController')

const args = {
	value: {
		type: GraphQLID,
		description: 'Value to search for',
	},
	through: {
		type: GraphQLID,
		description: 'Field to search through',
	},
}

const resolve = async (_, args) => {
	const { value, through } = args
	return await findOne({ through: value })
}

const users = {
	type: UserType,
	description: 'Get a user by id, email or username',
	args,
	resolve,
}

module.exports = users
