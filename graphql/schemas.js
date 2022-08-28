/*
 * Contains all GraphQL schemas settings.
 */

// required modules
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

// required queries
const { hello } = require('./queries')
const { register } = require('./mutations')

// setting up
const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'Root query type',
	fields: {
		hello,
	},
})

const MutationType = new GraphQLObjectType({
	name: 'MutationType',
	description: 'Root mutation type',
	fields: {
		register,
	},
})

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType,
})
