/**
 * @file Contains all GraphQL schemas.
 * @author Manuel Cabral
 * @version 0.0.7
 */

// required modules
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

// required queries
const {
	hello,
	users,
	user,
	chat,
	chats,
	verify,
	messages,
	sendEmailVerification,
} = require('./queries')

const { register, login, newMessage, newChat } = require('./mutations')

// setting up
const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'Root query type',
	fields: {
		hello,
		users,
		user,
		messages,
		chat,
		chats,
		verify,
		sendEmailVerification,
	},
})

const MutationType = new GraphQLObjectType({
	name: 'MutationType',
	description: 'Root mutation type',
	fields: {
		register,
		login,
		newChat,
		newMessage,
	},
})

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType,
})