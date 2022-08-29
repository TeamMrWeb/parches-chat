/**
 * @file Contains user model functions.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { User } = require('../models')

/**
 * Create a new user in the database.
 * @param {Object} args - The required user data.
 * @param {Boolean} save - If true, the user will be saved in the database.
 * @returns {Object} The new instanced user.
 */
const createUser = async (data, save = true) => {
	const newUser = new User(data)
	if (save) await newUser.save()
	return newUser
}

module.exports = {
	createUser,
}
