/**
 * @file Contains server configuration and initialization.
 * @author Manuel Cabral
 * @version 0.0.7
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
const { checkEmailCredentials } = require('./utils/email')

async function main() {
	// connect to database
	try {
		await connectDatabase()
	} catch (err) {
		console.log("Couldn't connect to database.", err)
	}

	// check email credentials
	try {
		await checkEmailCredentials()
		console.log('Email credentials are valid. Connection established.')
	} catch (err) {
		console.log("Couldn't connect to email server.", err)
	}

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
}

// runs application
main()
