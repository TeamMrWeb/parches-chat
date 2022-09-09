/**
 * @file Contains all GraphQL schemas.
 * @author Manuel Cabral
 * @version 0.0.8
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

// required mutations
const {
	register,
	login,
	createMessage,
	createChat,
	updateUser,
	addUserToChat,
	removeUserFromChat,
	refreshToken,
} = require('./mutations')

// required subscriptions
const { messageAdded } = require('./subscriptions')

// query graphql object
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

// mutation graphql object
const MutationType = new GraphQLObjectType({
	name: 'MutationType',
	description: 'Root mutation type',
	fields: {
		register,
		login,
		createChat,
		createMessage,
		updateUser,
		addUserToChat,
		removeUserFromChat,
		refreshToken,
	},
})

// subscription graphql object
const SubscriptionType = new GraphQLObjectType({
	name: 'SubscriptionType',
	description: 'Root subscription type',
	fields: {
		messageAdded,
	},
})

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType,
	subscription: SubscriptionType,
})
