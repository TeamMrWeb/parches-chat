/**
 * @file Contains all GraphQL mutations exports.
 * @author Manuel Cabral
 * @version 0.0.6
 */

module.exports = {
	// User
	register: require('./register'),
	login: require('./login'),
	updateUser: require('./updateUser'),
	refreshToken: require('./refreshToken'),

	// Messages
	createMessage: require('./createMessage'),
	updateMessage: require('./updateMessage'),
	deleteMessage: require('./deleteMessage'),

	// Chats
	createChat: require('./createChat'),
	deleteChat: require('./deleteChat'),
	addUserToChat: require('./addUserToChat'),
	removeUserFromChat: require('./removeUserFromChat'),
}
