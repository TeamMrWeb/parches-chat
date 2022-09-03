/**
 * @file Contains the verify query.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLNonNull, GraphQLString } = require('graphql')
const { verifyToken, findToken } = require('../../utils/auth')
const findUser = require('../../controllers/userController').findOne

// arguments object
const args = {
	token: {
		description: 'Token to verify',
		type: new GraphQLNonNull(GraphQLString),
	},
}

/**
 * Resolve a token verification.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A message.
 */
const resolve = async (_, args) => {
	const tokenDb = await findToken(args.token)
	if (!tokenDb) throw new Error('Token expired')
	const userDecoded = await verifyToken(args.token, { useEmail: true })
	const userDb = await findUser({ email: userDecoded.email }, false)
	if (!userDb) throw new Error('User not found')
	userDb.verified = true
	tokenDb.remove()
	await userDb.save()
	return 'Verified'
}

// export the query
module.exports = {
	type: GraphQLString,
	description: 'Verify a user by a token',
	args,
	resolve,
}
