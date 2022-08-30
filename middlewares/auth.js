/**
 * @file Contains authentification middleware.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config').JWT

/**
 * Authenticate token though auth header.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {void} Nothing.
 */
const authenticate = (req, res, next) => {
	const token = req.headers.auth
	if (!token) token = ''
	try {
		const decoded = jwt.verify(token, SECRET)
		req.user = decoded.user
		next()
	} catch (err) {
		console.error(err)
		next()
	}
}

module.exports = authenticate
