/**
 * @file Contains all middlewares.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const jwt = require('jsonwebtoken')

/**
 * Authenticate token though auth header.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {void}
 */
const authenticate = (req, res, next) => {
	const token = req.headers.auth
	if (!token) return res.status(401).json({ error: 'No token provided.' })
	jwt.verify(token, 'parches123', (err, decoded) => {
		if (err) res.status(401).json({ error: 'Unauthorized' })
		else req.user = decoded.user
	})
	next()
}

module.exports = {
	authenticate,
}
