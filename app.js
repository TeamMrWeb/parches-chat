/**
 * @file Contains all backend things for parches-chat application.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const authenticate = require('./middlewares/auth')
const schema = require('./graphql/schemas')

// setting up
const app = express()

// middlewares
app.use(authenticate)

// routes
app.get('/', (_, res) => {
	res.send('Hello World!')
})

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
)

module.exports = app
