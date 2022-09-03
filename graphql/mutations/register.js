/**
 * @file Contains register mutation.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const { sendEmail } = require('../../utils/email')
const { createToken, existsEmailToken } = require('../../utils/auth')
const { createUser, findOne } = require('../../controllers/userController')
const { GraphQLNonNull, GraphQLString } = require('graphql')

// arguments object
const args = {
	username: { type: new GraphQLNonNull(GraphQLString) },
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
}

/**
 * Resolve a a new user.
 * @param {Object} _ - Parent object, not used in this case.
 * @param {Object} args - Arguments passed to the mutation.
 * @returns {String} - A token.
 */
const resolve = async (_, args) => {
	const newUser = await createUser(args, false)
	const repeatedEmail = await existsEmailToken(args.email)
	if (repeatedEmail) throw new Error('Please verify your email')

	const user = await findOne({ email: args.email })
	if (user && !user.verified)
		throw new Error('User registered but not verified')

	await createUser(args, true)
	const token = createToken(
		{
			id: newUser._id,
			username: newUser.username,
			email: newUser.email,
		},
		{ useEmail: true }
	)

	/**
	 * @todo improve better email template
	 */
	const textEmail = `\
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Confirmar email</title>
            </head>
            <body>
                <h1>Confirmación de email</h1>
                <h2>Hola ${newUser.username}</h2>
                <p>Gracias por registrarte en Parches Chat. Para confirmar tu email, por favor haz click en el siguiente enlace: </p>
                <a href="http://localhost:3000/confirm/${token}">Confirmar email</a>
            </body>
        </html>
    `
	await sendEmail(newUser.email, 'Confirmación de email', textEmail)
	return token
}

// mutation object
const register = {
	type: GraphQLString,
	description: 'Register a new user',
	args,
	resolve,
}

module.exports = register
