/**
 * @file Contains all JWT related functions.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const jwt = require('jsonwebtoken')
const { SECRET, EXPIRES_IN } = require('../config').JWT

/**
 * Creates a new JWT token from a payload.
 * @param {Object} user - User object.
 * @returns {String} JWT token
 */
const createToken = (user) => {
	return jwt.sign({ user }, SECRET, { expiresIn: EXPIRES_IN })
}

module.exports = {
	createToken,
}
