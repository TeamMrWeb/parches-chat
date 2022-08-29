/**
 * @file Contains hello query (a simple test query).
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLString } = require('graphql')

const hello = {
	type: GraphQLString,
	description: 'Hello World!',
	resolve: () => 'Hello World!',
}

module.exports = hello
