/*
 * Contains all GraphQL schemas settings.
 */

// required modules
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

// required queries
const { hello } = require('./queries')

// setting up
const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'Root query type',
	fields: {
		hello,
	},
})

module.exports = new GraphQLSchema({
	query: QueryType,
})
