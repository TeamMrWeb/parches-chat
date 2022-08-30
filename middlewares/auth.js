/**
 * @file Contains authentification middleware.
 * @author Manuel Cabral
 * @version 0.0.5
 */

// required modules
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config').JWT

/**
 * Authenticate token though auth header.
 * @param {Object} req - Express request object.
 * @param {Object} _ - Express response object, not used.
 * @param {Function} next - Express next function.
 * @returns {void} Nothing.
 */
const authenticate = (req, _, next) => {
	const token = req.headers.auth
	try {
		const decoded = jwt.verify(token, SECRET)
		req.user = decoded.user
		next()
	} catch (err) {
		console.error(`${err.message} in ${req.originalUrl} from ${req.ip}`)
		next()
	}
}

module.exports = authenticate
