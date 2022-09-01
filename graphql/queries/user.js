/**
 * @file Contains user query.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLID } = require('graphql')
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
	return await findOne(args)
}

const user = {
	type: UserType,
	description: 'Get a user by id, email or username',
	args,
	resolve,
}

module.exports = user
