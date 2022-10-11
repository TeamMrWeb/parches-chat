/**
 * @file Contains server configuration and initialization.
 * @author Manuel Cabral
 * @version 0.0.9
 */

// required modules
const ws = require('ws')
const app = require('./app')
const port = require('./config').PORT
const schema = require('./graphql/schemas')
const createServer = require('http').createServer
const { execute, subscribe } = require('graphql')
const { useServer } = require('graphql-ws/lib/use/ws')
const { checkEmailCredentials } = require('./utils/email')
const { connectDatabase, checkDatabaseConnection } = require('./database')

async function main() {
	// check and connect to database

	if (!checkDatabaseConnection()) {
		console.log('Database not connected. Trying to connect...')
		try {
			await connectDatabase()
		} catch (err) {
			console.log("Couldn't connect to database.", err)
		}
	}

	// check email credentials
	const res = await checkEmailCredentials()
	if (!res.status) console.log('Error', res.error)
	else console.log('Email credentials are correct. Ready to send emails.')

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
