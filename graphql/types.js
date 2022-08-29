/**
 * @file Contains all GraphQL object types.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLObjectType, GraphQLID } = require('graphql')

// defining types
const UserType = new GraphQLObjectType({
	name: 'UserType',
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
		password: {
			type: GraphQLString,
			description: 'The password of the user.',
		},
	},
})

module.exports = {
	UserType,
}
