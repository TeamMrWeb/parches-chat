/**
 * @file Contains all GraphQL queries exports.
 * @author Manuel Cabral
 * @version 0.1.2
 */

module.exports = {
	hello: require('./hello'),
	users: require('./users'),
	user: require('./user'),
	chat: require('./chat'),
	chats: require('./chats'),
	friends: require('./friends'),
	//messages: require('./messages'),
	verify: require('./verify'),
	sendEmailVerification: require('./sendEmailVerification'),
}
