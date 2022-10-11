/**
 * @file Contains user query.
 * @author Manuel Cabral
 * @version 0.0.5
 */

// required modules
const { GraphQLID, GraphQLString } = require('graphql')
const { UserType } = require('../types')
const { findOne } = require('../../controllers/userController')

// arguments object
const args = {
	userId: {
		type: GraphQLID,
		description:
			'The id of the user, if not provided, logged user will be used.',
	},
	username: {
		type: GraphQLString,
		description:
			'The username of the user, if not provided, logged user will be used.',
	},
}

/**
 * Resolve a user by id.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to the query.
 * @param {Object} context - The context object of the request.
 * @returns {Object} The user object.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	const { userId, username } = args
	// TODO: better way to filter
	if (!user)
		throw new Error('Tienes que estar logueado para obtener un usuario.')
	if (userId) return await findOne({ _id: userId })
	else if (username) return await findOne({ username })
	else return await findOne({ _id: user.id })
}

// query object
const user = {
	type: UserType,
	description: 'Get a user by id.',
	args,
	resolve,
}

module.exports = user
