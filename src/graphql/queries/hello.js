/**
 * @file Contains hello query (a simple test query).
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const { GraphQLString } = require('graphql')

// arguments object
const hello = {
	type: GraphQLString,
	description: 'A simple test query that returns "Hello World!"',
	resolve: () => 'Hello World!',
}

module.exports = hello
