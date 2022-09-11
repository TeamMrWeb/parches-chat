/**
 * @file Contains all backend things for parches-chat application.
 * @author Manuel Cabral
 * @version 0.0.7
 */

// required modules
const cors = require('cors')
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const authenticate = require('./middlewares/auth')
const schema = require('./graphql/schemas')

// setting up
const app = express()

// middlewares
app.use(cors())
app.use(authenticate)

// routes
app.get('/', (_, res) => {
	res.send('Hello World')
})

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: {
			subscriptionEndpoint: `ws://localhost:4000/subscriptions`,
			websocketClient: 'v1',
		},
	})
)

module.exports = app
