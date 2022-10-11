/**
 * @file Contains user type.
 * @author Manuel Cabral
 * @version 0.0.5
 */

// required modules
const DateTimeType = require('./dateTimeType')
const AvatarType = require('./avatarType')
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
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
		avatar: {
			type: AvatarType,
			description: 'The avatar of the user.',
		},
		status: {
			type: GraphQLInt,
			description: 'The status of the user.',
		},
		verified: {
			type: GraphQLBoolean,
			description: 'If the user is verified or not.',
		},
		updatedAt: {
			type: DateTimeType,
			description: 'The date of the last update.',
		},
		createdAt: {
			type: DateTimeType,
			description: 'The date of the creation.',
		},
	},
})

module.exports = UserType
