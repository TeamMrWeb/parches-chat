/*
 * Contains all JWT related functions.
 */

// required modules
const jwt = require('jsonwebtoken')

const createAToken = (user) => {
	jwt.sign({ user }, 'parches123', { expiresIn: '1h' })
}

module.exports = {
	createAToken,
}
