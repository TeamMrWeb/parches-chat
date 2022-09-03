/**
 * @file Contains all GraphQL queries exports.
 * @author Manuel Cabral
 * @version 0.0.9
 */

module.exports = {
	hello: require('./queries/hello'),
	users: require('./queries/users'),
	user: require('./queries/user'),
	chat: require('./queries/chat'),
	chats: require('./queries/chats'),
	getAllChats: require('./queries/getAllChats'),
	findMessages: require('./queries/findMessages'),
	verify: require('./queries/verify'),
	sendEmailVerification: require('./queries/sendEmailVerification'),
}
