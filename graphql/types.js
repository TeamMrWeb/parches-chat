/**
 * @file Contains all GraphQL object types.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} = require('graphql')

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

const MessageType = new GraphQLObjectType({
	name: 'MessageType',
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
			description: 'The author of the message.',
		},
		seen: {
			type: new GraphQLList(UserType),
			description: 'The users that have seen the message.',
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

const ChatType = new GraphQLObjectType({
	name: 'ChatType',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The id of the chat.',
		},
		name: {
			type: GraphQLString,
			description: 'The name of the chat.',
		},
		users: {
			type: new GraphQLList(UserType),
			description: 'The users of the chat.',
		},
		messages: {
			type: new GraphQLList(MessageType),
			description: 'The messages of the chat.',
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

module.exports = {
	UserType,
	MessageType,
	ChatType,
}
