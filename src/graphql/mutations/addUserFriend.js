/**
 * @file Contains friend addition mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLNonNull, GraphQLID } = require('graphql')
const { UserType } = require('../types')
const { findById, addFriend } = require('../../controllers/userController')

// arguments object
const args = {
	userId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The user id to add as a friend.',
	},
}

/**
 * Add a friend to the current logged user.
 * @param {Object} _ - The parent object. Not used.
 * @param {Object} args - The arguments passed to the query.
 * @param {Object} context - The context object.
 * @returns {Object} The updated user object.
 */
const resolve = async (_, args, context) => {
	const { user } = context
	const { userId } = args
	if (!user) throw new Error('Tienes que estar logueado')

	const friend = await findById(args.userId)
	if (!friend) throw new Error('Usuario no encontrado.')

	let userDb = await findById(user.id)

	// check if the user already has the friend
	const friends = userDb.friends.map((friend) => friend._id.toString())
	if (friends.includes(args.userId))
		throw new Error('El usuario ya es tu amigo.')

	userDb = await addFriend(userDb._id, friend._id)
	return userDb
}

// mutation object
const addUserFriend = {
	type: UserType,
	description: 'Add a friend to the current logged user.',
	args,
	resolve,
}

module.exports = addUserFriend
