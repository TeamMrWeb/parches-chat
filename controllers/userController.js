/**
 * @file Contains user model functions.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const { User } = require('../models')
const { ObjectId } = require('mongoose').Types

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

/**
 * Find many users by their ids.
 * @param {Array} ids - The ids of the users to find.
 * @returns {Array} The users found.
 */
const findMany = async (ids) => {
	const mapIds = ids.map((id) => ObjectId(id))
	return await User.find({ _id: { $in: mapIds } })
}

module.exports = {
	createUser,
	findOne,
	findAll,
	findMany,
}
