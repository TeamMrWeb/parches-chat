/**
 * @file Contains all GraphQL queries exports.
 * @author Manuel Cabral
 * @version 0.0.3
 */

module.exports = {
	hello: require('./queries/hello'),
	users: require('./queries/users'),
	user: require('./queries/user'),
	findMessages: require('./queries/findMessages'),
	chat: require('./queries/chat'),
	chats: require('./queries/chats'),
	getAllChats: require('./queries/getAllChats'),
}
