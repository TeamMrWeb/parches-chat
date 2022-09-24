/**
 * @file Contains friends query.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLList, GraphQLInt } = require('graphql')
const { UserType } = require('../types')
const { findMany, findById } = require('../../controllers/userController')

const args = {
	status: {
		type: GraphQLInt,
		description: 'The status of the friend',
		defaultValue: 3,
	},
}

const resolve = async (_, args, { user }) => {
	const { status } = args
	if (!user) throw new Error('Tienes que estar logueado para obtener amigos.')
	const userDb = await findById(user.id)
	const filter = userDb.friends.filter((friend) => friend.status === status)
	const ids = filter.map((friend) => friend.user)
	return await findMany(ids)
}

// query object
friends = {
	type: new GraphQLList(UserType),
	description: 'The friends of the logged user.',
	args,
	resolve,
}

module.exports = friends
