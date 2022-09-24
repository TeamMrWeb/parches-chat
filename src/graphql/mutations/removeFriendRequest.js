/**
 * @file Conatains remove friend request mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
const { findById } = require('../../controllers/userController')

const args = {
	userId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The user id to remove the friend request from.',
	},
	senderId: {
		type: GraphQLID,
		description:
			'The user id of the sender. If not provided, the current logged user will be used.',
	},
}

const resolve = async (_, args, context) => {
	const { user } = context
	let { userId, senderId } = args
	if (!user) throw new Error('Tienes que estar logueado')
	if (!userId) throw new Error('El id del usuario no puede estar vacío')

	// if not senderid provided, use the current logged user
	if (!senderId) senderId = user.id

	if (senderId === userId)
		throw new Error(
			'No puedes eliminarte de tu lista de solicitudes de amistad'
		)

	let friend = await findById(userId)
	if (!friend) throw new Error('El usuario que quieres eliminar no existe.')

	let sender = await findById(senderId)
	if (!sender) throw new Error('Sender no encontrado.')

	// check if the sender already sent a friend request to the user
	const sended = sender.friends.find(
		(request) => request.user.toString() === userId
	)

	if (!sended)
		throw new Error('No has enviado una solicitud de amistad a este usuario.')

	// remove friend request from the user
	sender.friends = sender.friends.filter(
		(request) => request.user.toString() !== userId
	)
	sender.save()

	// remove friend pending request from the friend
	friend.friends = friend.friends.filter(
		(request) => request.user.toString() !== senderId
	)
	friend.save()
	return 'Solicitud eliminada de ' + friend.username
}

const removeFriendRequest = {
	type: GraphQLString,
	description: 'Remove a friend request.',
	args,
	resolve,
}

module.exports = removeFriendRequest
