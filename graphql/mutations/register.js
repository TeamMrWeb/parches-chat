/**
 * @file Contains register mutation.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { createUser } = require('../../controllers/userController')
const { createToken } = require('../../utils/auth')
const { GraphQLString } = require('graphql')

const args = {
	username: { type: GraphQLString },
	email: { type: GraphQLString },
	password: { type: GraphQLString },
}

const resolve = async (_, args) => {
	const newUser = await createUser(args, true)
	const token = createToken({
		id: newUser._id,
		username: newUser.username,
		email: newUser.email,
	})
	return token
}

const register = {
	type: GraphQLString,
	description: 'Register a new user',
	args,
	resolve,
}

module.exports = register
