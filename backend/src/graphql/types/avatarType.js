/**
 * @file Contains avatar type.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLObjectType, GraphQLString } = require('graphql')

const AvatarType = new GraphQLObjectType({
	name: 'AvatarType',
	description: 'The avatar type.',
	fields: {
		public_id: {
			type: GraphQLString,
			description: 'The id of the avatar.',
		},
		secure_url: {
			type: GraphQLString,
			description: 'The url of the avatar.',
		},
	},
})

module.exports = AvatarType
