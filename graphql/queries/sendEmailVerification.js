/**
 * @file Contains send email verification mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLString, GraphQLNonNull } = require('graphql')
const findOneUser = require('../../controllers/userController').findOne
const { createToken, existsEmailToken } = require('../../utils/auth')

// arguments object
const args = {
	username: { type: new GraphQLNonNull(GraphQLString) },
	email: { type: new GraphQLNonNull(GraphQLString) },
}

/**
 * Resolve a email verification.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A message.
 */
const resolve = async (_, args) => {
	const email = args.email
	const user = await findOneUser({ email }, false)
	if (!user) throw new Error('User not registered')
	if (user.verified) throw new Error('User already verified')
	const tokenDb = await existsEmailToken(email)
	if (tokenDb) throw new Error('Verification already sent')
	const token = await createToken({ email }, { useEmail: true })
	return 'Email sent'
}

// mutation object
const sendEmailVerification = {
	type: GraphQLString,
	description: 'Send a email verification',
	args,
	resolve,
}

module.exports = sendEmailVerification
