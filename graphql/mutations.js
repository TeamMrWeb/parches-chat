/**
 * @file Contains all GraphQL mutations exports.
 * @author Manuel Cabral
 * @version 0.0.4
 */

module.exports = {
	register: require('./mutations/register'),
	login: require('./mutations/login'),
	createMessage: require('./mutations/createMessage'),
	createChat: require('./mutations/createChat'),
	updateUser: require('./mutations/updateUser'),
	addUserToChat: require('./mutations/addUserToChat'),
}
