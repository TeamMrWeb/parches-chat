/*
 * Contains hello query (a simple test query).
 */

// required modules
const { GraphQLString } = require('graphql')

// setting up
const hello = {
	type: GraphQLString,
	description: 'Hello World!',
	resolve: () => 'Hello World!',
}

module.exports = hello
