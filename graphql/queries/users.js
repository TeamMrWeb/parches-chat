/**
 * @file Contains users query.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLList } = require('graphql')
const { UserType } = require('../types')
const { findAll } = require('../../controllers/userController')

/**
 * Resolve all users.
 * @returns {Object[]} The users object array.
 */
const resolve = async () => {
	return await findAll()
}

// query object
const users = {
	type: new GraphQLList(UserType),
	description: 'List of all users',
	resolve,
}

module.exports = users
