/**
 * @file Contains update user mutation.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const { GraphQLString, GraphQLInt } = require('graphql')
const { UserType } = require('../types')
const { isValidEmail } = require('../../utils/email')
const { updateOneUser, findOne } = require('../../controllers/userController')

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
		type: GraphQLInt,
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
	if (!args) throw new Error('No se han pasado argumentos.')
	const { user } = context
	if (!user)
		throw new Error('Tienes que estar logeado para actualizar tu cuenta.')

	if (!isValidEmail(args.email)) throw new Error('El email no es válido.')
	const existUser = await findOne({ email: args.email })
	if (existUser && existUser._id != user._id)
		throw new Error('El email ya está registrado.')

	const updatedUser = await updateOneUser(user.id, args)
	const emailHasChanged = args.email !== updatedUser.email
	if (emailHasChanged) {
		// TODO: send email to confirm the new email
		updatedUser.verified = false
	}
	return updatedUser
}

// mutation object
const updateUser = {
	type: UserType,
	description: 'Updates a logged user.',
	args,
	resolve,
}

module.exports = updateUser
