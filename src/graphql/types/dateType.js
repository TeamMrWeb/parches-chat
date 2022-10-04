/**
 * @file Contains date type.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const { GraphQLScalarType } = require('graphql')

// type object
const DateType = new GraphQLScalarType({
	name: 'Date',
	description: 'The date scalar type represents a Date object.',
	parseValue: (value) => new Date(value),
	serialize: (value) => value.toISOString(),
})

module.exports = DateType
