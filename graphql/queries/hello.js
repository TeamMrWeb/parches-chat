/**
 * @file Contains hello query (a simple test query).
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLString } = require('graphql')

// arguments object
const hello = {
	type: GraphQLString,
	description: 'Hello World!',
	resolve: () => 'Hello World!',
}

module.exports = hello
