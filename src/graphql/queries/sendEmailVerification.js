/**
 * @file Contains send email verification mutation.
 * @author Manuel Cabral
 * @version 0.1.0
 */

// required modules
const { GraphQLString, GraphQLNonNull } = require('graphql')
const findOneUser = require('../../controllers/userController').findOne
const { createToken, existsEmailToken } = require('../../utils/auth')
const { sendVerification } = require('../../utils/email')

// arguments object
const args = {
	email: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'Email of the user to send the email verification',
	},
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
	await sendVerification(user, token, 'Confirmar email')
	return 'Confirmación de email enviada'
}

// query object
const sendEmailVerification = {
	type: GraphQLString,
	description: 'Send a email verification to the user.',
	args,
	resolve,
}

module.exports = sendEmailVerification
