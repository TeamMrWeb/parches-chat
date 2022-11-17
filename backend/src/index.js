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
const { existsPath, createPath, clearFolderFiles } = require('./utils/files')
const temp_folder = require('./config').CLOUDINARY.TEMP_FOLDER
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
	let res = await checkEmailCredentials()
	if (!res.status) console.log('Error', res.error)
	else console.log('Email credentials are correct. Ready to send emails.')

	// clear files from uploads folder
	console.log('Clearing files from temp folder...')
    const folderExist = await existsPath(temp_folder)
    if (!folderExist){
        console.log('Temp folder does not exist. Creating it...')
        await createPath(temp_folder)
    }
	res = await clearFolderFiles(temp_folder)
	if (!res) console.log('Temp folder is empty.')
	else console.log('Temp folder cleared.')

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
