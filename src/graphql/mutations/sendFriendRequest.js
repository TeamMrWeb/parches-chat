/**
 * @file Conatains the friend request mutation.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
const { findById } = require('../../controllers/userController')

const args = {
	userId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The user id to send the friend request to.',
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
		throw new Error('No puedes enviarte una solicitud de amistad a ti mismo')

	if (senderId !== user.id)
		throw new Error('No tienes permiso para enviar esta solicitud de amistad.')

	let friend = await findById(userId)
	if (!friend) throw new Error('Usurio no encontrado.')

	let sender = await findById(senderId)
	if (!sender) throw new Error('Sender no encontrado.')

	// check if the sender already sent a friend request to the user
	const sended = sender.friends.find(
		(request) => request.user.toString() === userId
	)

	if (sended)
		throw new Error('Ya has enviado una solicitud de amistad a este usuario.')

	// add friend request to the user
	sender.friends.push({
		user: friend._id,
		status: 1, // 1: requested
	})

	// add friend pending request to the friend
	friend.friends.push({
		user: sender._id,
		status: 2, // 2: pending
	})

	friend.save()
	sender.save()

	return 'Solicitud enviada a ' + friend.username
}

const sendFriendRequest = {
	type: GraphQLString,
	description: 'Send a friend request to a user.',
	args,
	resolve,
}

module.exports = sendFriendRequest
