/**
 * @file Contains message type.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const UserType = require('./userType')
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
} = require('graphql')

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
			type: GraphQLString,
			description: 'The date of the creation.',
		},
	},
})

module.exports = MessageType
