/**
 * @file Contains all database things.
 * @author Manuel Cabral
 * @version 0.0.6
 */

// required modules
const mongoose = require('mongoose')
const URL = require('../config').DB.URL

// setting up
const connectDatabase = async (url) => {
	try {
		await mongoose.connect(url || URL)
		console.log(`Connected to ${url || URL} database successfully.`)
	} catch (err) {
		throw new Error(`Couldn't connect to ${URL} database.`)
	}
}

const closeDatabase = async () => {
	try {
		await mongoose.connection.close()
		console.log('Database connection closed.')
	} catch (err) {
		throw new Error("Couldn't close database connection.")
	}
}

/**
 * Checks if the database is connected successfully.
 * @returns {Boolean} - True if connected. Otherwise, false.
 */
const checkDatabaseConnection = () => {
	return mongoose.connection.readyState === 1
}

module.exports = {
	closeDatabase,
	connectDatabase,
	checkDatabaseConnection,

	// export all models
	models: {
		User: require('./models/User'),
		Message: require('./models/Message'),
		Chat: require('./models/Chat'),
		Token: require('./models/Token'),
	},
}
