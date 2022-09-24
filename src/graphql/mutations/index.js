/**
 * @file Contains all GraphQL mutations exports.
 * @author Manuel Cabral
 * @version 0.1.1
 */

module.exports = {
	// User
	register: require('./register'),
	login: require('./login'),
	updateUser: require('./updateUser'),
	refreshToken: require('./refreshToken'),
	sendFriendRequest: require('./sendFriendRequest'),
	removeFriendRequest: require('./removeFriendRequest'),
	declineFriendRequest: require('./declineFriendRequest'),
	acceptFriendRequest: require('./acceptFriendRequest'),

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
