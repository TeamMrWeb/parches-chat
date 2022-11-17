/**
 * @file Contains login mutation.
 * @author Manuel Cabral
 * @version 0.1.0
 */

// required modules
const { findOne } = require('../../controllers/userController')
const { createToken } = require('../../utils/auth')
const { GraphQLNonNull, GraphQLString } = require('graphql')

// arguments object
const args = {
	email: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The email of the user.',
	},
	password: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The password of the user (not hashed).',
	},
	authStrategy: {
		type: GraphQLString,
		description: 'The auth strategy to use.',
	},
}

/**
 * Resolve a user login.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A token.
 */
const resolve = async (_, args) => {
	let user
	if (args.authStrategy === 'google') {
		user = await findOne({ email: args.email, fromPlatform: 'google' }, false)
		if (!user) throw new Error('Usuario no registrado desde google.')
	} else {
		user = await findOne(args, false)
		if (!user || args.password !== user.password)
			throw new Error('Creedenciales incorrectas.')
	}
	if (!user.verified)
		throw new Error('Usuario no verificado, por favor verifica tu cuenta.')
	return createToken({
		id: user._id,
		username: user.username,
		email: user.email,
	})
}

// mutation object
const login = {
	type: GraphQLString,
	description: 'Login a user and returns a access token.',
	args,
	resolve,
}

module.exports = login
