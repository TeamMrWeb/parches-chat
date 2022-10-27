/**
 * @file Contains register mutation.
 * @author Manuel Cabral
 * @version 0.1.0
 */

// required modules
const { existsEmailToken } = require('../../utils/auth')
const { createUser, findOne } = require('../../controllers/userController')
const { GraphQLNonNull, GraphQLString } = require('graphql')

// arguments object
const args = {
	username: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The username of the user.',
	},
	email: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The email of the user.',
	},
	password: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The password of the user (not hashed).',
	},
}

/**
 * Resolve a a new user.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A token.
 */
const resolve = async (_, args) => {
	const repeatedEmail = await existsEmailToken(args.email)
	if (repeatedEmail) throw new Error('Por favor verifica tu cuenta.')

	const user = await findOne({ email: args.email })
	if (user && !user.verified)
		throw new Error('Usuario ya registrado, por favor verifica tu cuenta.')

	const newUser = await createUser(args, true)
	newUser.save()
	return 'Cuenta registrada correctamente'
}

// mutation object
const register = {
	type: GraphQLString,
	description: 'Register a new user.',
	args,
	resolve,
}

module.exports = register
