/**
 * @file Contains send email verification mutation.
 * @author Manuel Cabral
 * @version 0.0.9
 */

// required modules
const { GraphQLString, GraphQLNonNull } = require('graphql')
const findOneUser = require('../../controllers/userController').findOne
const { createToken, existsEmailToken } = require('../../utils/auth')
const { sendEmail } = require('../../utils/email')

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
	const textEmail = `\
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Confirmar email</title>
        </head>
        <body>
            <h1>Reconfirmación de email</h1>
            <h2>Hola ${user.username}</h2>
            <p>Gracias por registrarte en Parches Chat. Para reconfirmar tu email, por favor haz click en el siguiente enlace: </p>
            <a href="http://localhost:3000/account/verify/${token}">Reconfirmar email</a>
        </body>
    </html>
    `
	await sendEmail(user.email, 'Confirmación de email', textEmail)
	return 'Email sent'
}

// query object
const sendEmailVerification = {
	type: GraphQLString,
	description: 'Send a email verification to the user.',
	args,
	resolve,
}

module.exports = sendEmailVerification
