/**
 * @file Contains user type.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
} = require('graphql')

const UserType = new GraphQLObjectType({
	name: 'UserType',
	description: 'The user type.',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The id of the user.',
		},
		username: {
			type: GraphQLString,
			description: 'The username of the user.',
		},
		email: {
			type: GraphQLString,
			description: 'The email of the user.',
		},
		status: {
			type: GraphQLInt,
			description: 'The status of the user.',
		},
		updatedAt: {
			type: GraphQLString,
			description: 'The date of the last update.',
		},
		createdAt: {
			type: GraphQLString,
			description: 'The date of the creation.',
		},
	},
})

module.exports = UserType
