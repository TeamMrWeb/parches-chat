/**
 * @file Contains user model functions.
 * @author Manuel Cabral
 * @version 0.0.4
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

/**
 * Find a user by its id.
 * @param {Object} data - Data to find the user, usually an email or id.
 * @param {Boolean} secure - If true, the password will be excluded from the result.
 * @returns {Object} The user found.
 */
const findOne = async (data, secure = true) =>
	await User.findOne(data).select(secure ? '' : '+password')

/**
 * Find all users.
 * @returns {Array} The users found.
 */
const findAll = async () => await User.find()

module.exports = {
	createUser,
	findOne,
	findAll,
}
