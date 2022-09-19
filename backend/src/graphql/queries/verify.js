/**
 * @file Contains the verify query.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const { GraphQLNonNull, GraphQLString } = require('graphql')
const { verifyToken, findToken } = require('../../utils/auth')
const findUser = require('../../controllers/userController').findOne

/**
 * Resolve a token email verification.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation, not used in this case.
 * @param {Object} context - Context object.
 * @returns {String} - A message.
 */
const resolve = async (_, __, context) => {
	const token = context.headers.authorization
	if (!token) throw new Error('No se ha proporcionado un token')

	const userDecoded = await verifyToken(token, { useEmail: true })
	const tokenDb = await findToken(token)
	if (!tokenDb) throw new Error('El token no pertenece a nuestro sistema')

	const userDb = await findUser({ email: userDecoded.email }, false)
	if (!userDb) throw new Error('Usuario no encontrado')

	userDb.verified = true
	tokenDb.remove()
	await userDb.save()
	return 'Verificado correctamente'
}

// query object
module.exports = {
	type: GraphQLString,
	description: 'Verify a user by a token (through headers)',
	resolve,
}
