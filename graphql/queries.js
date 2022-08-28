/*
 * Contains all GraphQL queries.
 */

// required modules
const { GraphQLString } = require('graphql')

// setting up
const hello = {
	type: GraphQLString,
	description: 'Hello World!',
	resolve: () => 'Hello World!',
}

module.exports = {
	hello,
}
