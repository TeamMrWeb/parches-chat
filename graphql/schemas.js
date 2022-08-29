/**
 * @file Contains all GraphQL schemas.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

// required queries
const { hello } = require('./queries')
const { register, login } = require('./mutations')

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
		login,
	},
})

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType,
})
