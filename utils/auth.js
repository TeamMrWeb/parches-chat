/**
 * @file Contains all JWT related functions.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const jwt = require('jsonwebtoken')
const { SECRET, EXPIRES_IN, EMAIL_SECRET, EMAIL_EXPIRES_IN } =
	require('../config').JWT

/**
 * Creates a new JWT token from a payload.
 * @param {Object} user - User object.
 * @param {Object} options - Options object.
 * @param {Boolean} options.useEmail - If true, uses the email secret.
 * @returns {String} JWT token
 */
const createToken = (user, options) => {
	const { useEmail } = options || {}
	const secret = useEmail ? EMAIL_SECRET : SECRET
	const expiresIn = useEmail ? EMAIL_EXPIRES_IN : EXPIRES_IN
	return jwt.sign({ user }, secret, { expiresIn })
}

module.exports = {
	createToken,
}
