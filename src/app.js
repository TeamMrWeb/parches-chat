/**
 * @file Contains all backend things for parches-chat application.
 * @author Manuel Cabral
 * @version 0.0.8
 */

// required modules
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const compression = require('compression')
const fileupload = require('express-fileupload')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const authenticate = require('./middlewares/auth')
const schema = require('./graphql/schemas')

// setting up
const app = express()
const logger = morgan('dev')

// middlewares
if (process.env.NODE_ENV.trim() === 'development') app.use(logger)
app.use(cors())
app.use(compression())
app.use(authenticate)
app.use(fileupload({ useTempFiles: true, tempFileDir: './tmp' }))

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
