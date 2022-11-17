/**
 * @file Contains message type.
 * @author Manuel Cabral
 * @contributor Leo Araya
 * @version 0.0.4
 */

// required modules
const UserType = require('./userType')
const DateTimeType = require('./dateTimeType')
// NOTE: Using avatar type for image object
const AvatarType = require('./avatarType')
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
} = require('graphql')

const { findById } = require('../../controllers/userController')

const MessageType = new GraphQLObjectType({
	name: 'MessageType',
	description: 'The message type.',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The id of the message.',
		},
		text: {
			type: GraphQLString,
			description: 'The text of the message.',
		},
		image: {
			type: AvatarType,
			description: 'The image of the message.',
		},
		author: {
			type: UserType,
			description: 'Get the author of the message.',
			resolve: async (parent) => findById(parent.author),
		},
		edited: {
			type: GraphQLBoolean,
			description: 'If the message has been edited.',
		},
		seen: {
			type: new GraphQLList(UserType),
			description: 'Get the users that have seen the message.',
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

module.exports = MessageType
