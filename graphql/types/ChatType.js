/**
 * @file Contains chat type.
 * @author Manuel Cabral
 * @contributor Leo Araya
 * @version 0.0.6
 */

// required modules
const UserType = require('./userType')
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
			type: GraphQLString,
			description: 'The date of the last update.',
		},
		createdAt: {
			type: GraphQLString,
			description: 'The date of the creation.',
		},
	},
})

module.exports = ChatType
