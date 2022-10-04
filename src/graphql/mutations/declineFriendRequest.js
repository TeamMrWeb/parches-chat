/**
 * @file Conatains decline friend request mutation.}
 *
 * NOTE:
 * The difference between this mutation and the removeFriendRequest is that
 * this one removes the pending requests from the receiver user.
 *
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
const { findById } = require('../../controllers/userController')

const args = {
	userId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The user id to decline the friend request from.',
	},
}

const resolve = async (_, { userId }, { user }) => {
	if (!user) throw new Error('Tienes que estar logueado')
	if (!userId) throw new Error('El id del usuario no puede estar vacío')

	const id = user.id
	if (id === userId)
		throw new Error('No puedes rechazar una solicitud de amistad de ti mismo')

	let friend = await findById(userId)
	if (!friend)
		throw new Error('El usuario que te ha enviado la solicitud ya no existe.')

	let userDb = await findById(id)
	if (!userDb) throw new Error('Hubo un problema al buscar tu usuario.')

	const friendRequest = userDb.friends.find(
		(request) => request.user.toString() === userId
	)

	if (!friendRequest || friendRequest.status !== 2)
		throw new Error(
			'No tienes ninguna solicitud de amistad pendiente para rechazar de este usuario.'
		)

	// filter the friend request (remove it)
	userDb.friends = userDb.friends.filter(
		(request) => request.user.toString() !== userId
	)
	userDb.save()

	friend.friends = friend.friends.filter(
		(request) => request.user.toString() !== id
	)
	friend.save()

	return 'Solicitud de amistad rechazada.'
}

const declineFriendRequest = {
	type: GraphQLString,
	description: 'Decline a friend request.',
	args,
	resolve,
}

module.exports = declineFriendRequest
