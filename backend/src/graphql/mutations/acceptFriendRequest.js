/**
 * @file Conatains accept friend request mutation.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
const { findById } = require('../../controllers/userController')

const args = {
	userId: {
		type: new GraphQLNonNull(GraphQLID),
		description: 'The user id to accept the friend request from.',
	},
}

const resolve = async (_, args, context) => {
	const { user } = context
	let { userId } = args

	if (!user) throw new Error('Tienes que estar logueado')
	if (!userId) throw new Error('El id del usuario no puede estar vacío')

	const id = user.id
	if (id === userId)
		throw new Error('No puedes aceptar una solicitud de amistad de ti mismo')

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
			'No tienes ninguna solicitud de amistad pendiente de este usuario.'
		)

	// update the status to accepted
	userDb.friends = userDb.friends.map((request) => {
		if (request.user.toString() === userId) request.status = 3 // 3: friend = accepted
		return request
	})
	userDb.save()

	// now update the status of the friend
	friend.friends = friend.friends.map((request) => {
		if (request.user.toString() === id) request.status = 3 // 3: friend = accepted
		return request
	})
	friend.save()

	return 'Solicitud de amistad aceptada.'
}

const removeFriendRequest = {
	type: GraphQLString,
	description: 'Remove a friend request.',
	args,
	resolve,
}

module.exports = removeFriendRequest
