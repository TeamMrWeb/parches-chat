/**
 * @file Contains all JWT related functions.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const jwt = require('jsonwebtoken')
const { Token } = require('../database').models
const { SECRET, EXPIRES_IN, EMAIL_SECRET, EMAIL_EXPIRES_IN } =
	require('../config').JWT

/**
 * Creates a new JWT token from a payload.
 * @param {Object} user - User object.
 * @param {Object} options - Options object.
 * @param {Boolean} options.useEmail - If true, uses the email secret and saves the token in the database.
 * @returns {String} JWT token
 */
const createToken = async (user, options) => {
	const { useEmail } = options || {}
	const secret = useEmail ? EMAIL_SECRET : SECRET
	const expiresIn = useEmail ? EMAIL_EXPIRES_IN : EXPIRES_IN
	const token = jwt.sign({ user }, secret, { expiresIn })
	if (useEmail) {
		const newToken = new Token({ token, email: user.email })
		await newToken.save()
	}
	return token
}

/**
 * Verifies a JWT token.
 * @param {String} token - JWT token.
 * @param {Object} options - Options object.
 * @param {Boolean} options.useEmail - If true, uses the email secret.
 * @returns {Object} - Decoded token.
 */
const verifyToken = async (token, options) => {
	const { useEmail } = options || {}
	const secret = useEmail ? EMAIL_SECRET : SECRET
	const decoded = jwt.verify(token, secret)
	if (!decoded) throw new Error('Invalid token')
	if (useEmail) {
		const dbToken = await Token.findOne({ token })
		if (!dbToken) throw new Error('Token expired')
		dbToken.remove()
	}
	return decoded.user
}

/**
 * Finds a token by email.
 * @param {String} email - Email to check.
 * @returns {Object} - Token object.
 */
const existsEmailToken = async (email) => await Token.findOne({ email })

/**
 * Find a token.
 * @param {String} token - Token to find.
 * @returns {Object} - Token object.
 */
const findToken = async (token) => await Token.findOne({ token })

module.exports = {
	createToken,
	verifyToken,
	existsEmailToken,
	findToken,
}
