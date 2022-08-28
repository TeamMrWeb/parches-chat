/*
 * Contains all GraphQL schemas settings.
 */

// required modules
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

// required queries
const { hello } = require('./queries')

// setting up
const RootType = new GraphQLObjectType({
	name: 'RootType',
	description: 'Root Type query',
	fields: {
		hello,
	},
})

module.exports = new GraphQLSchema({
	query: RootType,
})
