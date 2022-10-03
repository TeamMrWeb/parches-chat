/**
 * @file Contains chat type.
 * @author Manuel Cabral
 * @contributor Leo Araya
 * @version 0.0.9
 */

// required modules
const UserType = require('./userType')
const DateType = require('./DateType')
const messages = require('../queries/messages')
const findManyUsers = require('../../controllers/userController').findMany
const findUserById = require('../../controllers/userController').findById

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean,
	GraphQLInt,
} = require('graphql')

const ChatType = new GraphQLObjectType({
	name: 'ChatType',
	description: 'The chat type.',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The id of the chat.',
		},
		name: {
			type: GraphQLString,
			description: 'The name of the chat.',
		},
		avatar: {
			type: GraphQLString,
			description: 'The avatar of the chat.',
		},
		admins: {
			type: new GraphQLList(UserType),
			description: 'The admins of the chat.',
			resolve: async (parent) => findManyUsers(parent.admins),
		},
		owner: {
			type: UserType,
			description: 'The owner of the chat',
			resolve: async (parent) => findUserById(parent.ownerId),
		},
		isGroup: {
			type: GraphQLBoolean,
			description: 'If the chat is a group or not.',
		},
		secure: {
			type: GraphQLBoolean,
			description: 'If the chat is secure',
		},
		private: {
			type: GraphQLBoolean,
			description: 'If the chat is private or not.',
		},
		maxUsers: {
			type: GraphQLInt,
			description: 'Max users in chat',
		},
		users: {
			type: new GraphQLList(UserType),
			description: 'The users of the chat.',
			resolve: async (parent) => findManyUsers(parent.users),
		},
		messages,
		updatedAt: {
			type: DateType,
			description: 'The date of the last update.',
		},
		createdAt: {
			type: DateType,
			description: 'The date of the creation.',
		},
	},
})

module.exports = ChatType
