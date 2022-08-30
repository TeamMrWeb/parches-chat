/**
 * @file Contains register mutation.
 * @author Manuel Cabral
 * @version 0.0.5
 */

// required modules
const { createUser } = require('../../controllers/userController')
const { createToken } = require('../../utils/auth')
const { GraphQLNonNull, GraphQLString } = require('graphql')

// arguments object
const args = {
	username: { type: new GraphQLNonNull(GraphQLString) },
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
}

/**
 * Resolve a a new user.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A token.
 */
const resolve = async (_, args) => {
	const newUser = await createUser(args, true)
	return createToken({
		id: newUser._id,
		username: newUser.username,
		email: newUs,
	})
}

// mutation object
const register = {
	type: GraphQLString,
	description: 'Register a new user',
	args,
	resolve,
}

module.exports = register
