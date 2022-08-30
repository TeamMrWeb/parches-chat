/**
 * @file Contains register mutation.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const { createUser } = require('../../controllers/userController')
const { createToken } = require('../../utils/auth')
const { GraphQLNonNull, GraphQLString } = require('graphql')

const args = {
	username: { type: new GraphQLNonNull(GraphQLString) },
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
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
