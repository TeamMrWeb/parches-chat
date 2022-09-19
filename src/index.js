/**
 * @file Contains server configuration and initialization.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const ws = require('ws')
const app = require('./app')
const port = require('./config').PORT
const schema = require('./graphql/schemas')
const createServer = require('http').createServer
const { execute, subscribe } = require('graphql')
const { useServer } = require('graphql-ws/lib/use/ws')
const { connectDatabase } = require('./database')

// connect to database
connectDatabase()

// create server
const server = createServer(app)

// create websocket server for subscriptions
const wsServer = new ws.Server({ server, path: '/subscriptions' })

server.listen(port, () => {
	// use graphql-ws for subscriptions
	useServer(
		{
			schema,
			execute,
			subscribe,
		},
		wsServer
	)
	console.log(`Server running on port ${port}`)
})
