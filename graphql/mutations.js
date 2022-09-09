/**
 * @file Contains all GraphQL mutations exports.
 * @author Manuel Cabral
 * @version 0.0.6
 */

module.exports = {
	// User
	register: require('./mutations/register'),
	login: require('./mutations/login'),
	updateUser: require('./mutations/updateUser'),
	refreshToken: require('./mutations/refreshToken'),

	// Messages
	createMessage: require('./mutations/createMessage'),
	updateMessage: require('./mutations/updateMessage'),

	// Chats
	createChat: require('./mutations/createChat'),
	deleteChat: require('./mutations/deleteChat'),
	addUserToChat: require('./mutations/addUserToChat'),
	removeUserFromChat: require('./mutations/removeUserFromChat'),
}
