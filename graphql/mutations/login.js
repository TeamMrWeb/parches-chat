/**
 * @file Contains login mutation.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const { findOne } = require('../../controllers/userController')
const { createToken } = require('../../utils/auth')
const { GraphQLNonNull, GraphQLString } = require('graphql')

// arguments object
const args = {
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
}

/**
 *
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A token.
 */
const resolve = async (_, args) => {
	const user = await findOne(args, false)
	if (!user || args.password !== user.password)
		throw new Error('Invalid credentials')
	return createToken({
		id: user._id,
		username: user.username,
		email: user.email,
	})
}

const login = {
	type: GraphQLString,
	description: 'Login a user',
	args,
	resolve,
}

module.exports = login
