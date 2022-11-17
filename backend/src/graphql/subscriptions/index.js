/**
 * @file Contains all GraphQL subscription exports.
 * @author Manuel Cabral
 * @version 0.0.2
 */

module.exports = {
	chatMessageAdded: require('./chatMessageAdded'),
	messageAdded: require('./messageAdded'),
	userMessageNotification: require('./userMessageNotification'),
}
