/**
 * @file Contains refresh token mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const jwt = require('jsonwebtoken')
const SECRET = require('../../config').JWT.SECRET
const { GraphQLNonNull, GraphQLString } = require('graphql')
const { createToken } = require('../../utils/auth')

// arguments object
const args = {
	token: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The token to refresh (not expired).',
	},
}

const resolve = async (_, args, context) => {
	const { user } = context
	const { token } = args
	if (!token) throw new Error('No se proporciono el token para refrescar.')
	if (!user) throw new Error('No estas logeado para refrescar el token.')
	const decoded = jwt.verify(token, SECRET)
	if (!decoded) throw new Error('El token no es valido.')
	const newToken = await createToken(user)
	return newToken
}

// mutation object
const refreshToken = {
	type: GraphQLString,
	description: 'Refresh a token.',
	args,
	resolve,
}

module.exports = refreshToken
