/**
 * @file Contains all JWT related functions.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const jwt = require('jsonwebtoken')

const createToken = (user) => {
	return jwt.sign({ user }, 'parches123', { expiresIn: '1h' })
}

module.exports = {
	createToken,
}
