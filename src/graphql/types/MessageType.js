/**
 * @file Contains message type.
 * @author Manuel Cabral
 * @contributor Leo Araya
 * @version 0.0.3
 */

// required modules
const UserType = require('./userType')
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLScalarType,
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
			type: GraphQLString,
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
			type: GraphQLString,
			description: 'The date of the last update.',
		},
		createdAt: {
			/**
			 * TODO: Change this to a custom scalar type in another file.
			 */
			type: new GraphQLScalarType({
				name: 'Date',
				parseValue: (value) => new Date(value),
				serialize: (value) => value.toISOString(),
			}),
			description: 'The date of the creation.',
		},
	},
})

module.exports = MessageType