/**
 * @file Contains users query.
 * @author Manuel Cabral
 * @version 0.0.3
 * @TODO add more filter options
 */

// required modules
const { GraphQLList, GraphQLString, GraphQLBoolean } = require('graphql')
const { UserType } = require('../types')
const { findAll } = require('../../controllers/userController')

const args = {
	username: {
		type: GraphQLString,
		description: 'The username filter.',
	},
	verified: {
		type: GraphQLBoolean,
		description: 'If the user is verified.',
	},
}

/**
 * Resolve all users.
 * @returns {Object[]} The users object array.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	const { username, verified } = args
	if (!user) throw new Error('Tienes que estar logueado para obtener usuarios.')
	if (username) return await findAll({ username })
	else if (verified) return await findAll({ verified })
	else return await findAll()
}

// query object
const users = {
	type: new GraphQLList(UserType),
	description: 'Returns all users from the database.',
	args,
	resolve,
}

module.exports = users
