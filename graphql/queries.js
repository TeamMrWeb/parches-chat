/**
 * @file Contains all GraphQL queries exports.
 * @author Manuel Cabral
 * @version 0.1.1
 */

module.exports = {
	hello: require('./queries/hello'),
	users: require('./queries/users'),
	user: require('./queries/user'),
	chat: require('./queries/chat'),
	chats: require('./queries/chats'),
	messages: require('./queries/messages'),
	verify: require('./queries/verify'),
	sendEmailVerification: require('./queries/sendEmailVerification'),
}
