/**
 * @file Contains users query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLList } = require('graphql')
const { UserType } = require('../types')
const { findAll } = require('../../controllers/userController')

const resolve = async () => {
	return await findAll()
}

const users = {
	type: new GraphQLList(UserType),
	description: 'List of all users',
	resolve,
}

module.exports = users
