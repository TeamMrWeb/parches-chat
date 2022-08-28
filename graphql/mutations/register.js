/*
 * Contains register mutation.
 */

// required modules
const { createAToken } = require('../../utils/auth')
const { GraphQLString } = require('graphql')
const { User } = require('../../models')

const args = {
	username: { type: GraphQLString },
	email: { type: GraphQLString },
	password: { type: GraphQLString },
}

const resolve = async (_, args) => {
	const { username, email, password } = args

	const newUser = new User({ username, email, password })
	await newUser.save()

	const token = createAToken({
		id: newUser._id,
		username: newUser.username,
		email: newUser.email,
	})

	console.log('New user created')
	return token
}

const register = {
	type: GraphQLString,
	description: 'Register a new user',
	args,
	resolve,
}

module.exports = register
