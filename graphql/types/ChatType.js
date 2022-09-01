/**
 * @file Contains chat type.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const UserType = require('./userType')
const MessageType = require('./messageType')
const findMessages = require('../queries/findMessages')
const findManyUsers = require('../../controllers/userController').findMany

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
		isGroup: {
			type: GraphQLBoolean,
			description: 'If the chat is a group or not.',
		},
		users: {
			type: new GraphQLList(UserType),
			description: 'The users of the chat.',
			resolve: async (parent) => findManyUsers(parent.users),
		},
		messages: findMessages,
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