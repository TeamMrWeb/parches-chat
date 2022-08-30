/**
 * @file Contains login mutation.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const { GraphQLNonNull, GraphQLString } = require('graphql')
const { findOne } = require('../../controllers/userController')
const { createToken } = require('../../utils/auth')

const args = {
	email: { type: GraphQLNonNull(GraphQLString) },
	password: { type: GraphQLNonNull(GraphQLString) },
}

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
