/**
 * @file Contains update user mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLString } = require('graphql')
const { UserType } = require('../types')
const { updateOneUser } = require('../../controllers/userController')

const args = {
	username: {
		type: GraphQLString,
		description: 'The new name of the user.',
	},
	email: {
		type: GraphQLString,
		description: 'The new email of the user.',
	},
	avatar: {
		type: GraphQLString,
		description: 'The new avatar of the user.',
	},
	status: {
		type: GraphQLString,
		description: 'The new status of the user.',
	},
}

/**
 * Resolve update user mutation.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to be updated.
 * @param {Object} context - The context object of the request.
 * @returns {Object} - The updated user object.
 */
const resolve = async (_, args, context) => {
	if (!args) throw new Error('No arguments provided')
	const { user } = context
	if (!user) throw new Error('You must be logged in to update your profile.')
	return await updateOneUser(user.id, args)
}

// mutation object
const updateUser = {
	type: UserType,
	description: 'Update a user',
	args,
	resolve,
}

module.exports = updateUser
