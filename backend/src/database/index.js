/**
 * @file Contains all database things.
 * @author Manuel Cabral
 * @version 0.0.5
 */

// required modules
const mongoose = require('mongoose')
const URL = require('../config').DB.URL

// setting up
const connectDatabase = async () => {
	try {
		await mongoose.connect(URL)
		console.log(`Connected to ${URL} database successfully.`)
	} catch (err) {
		throw new Error(`Couldn't connect to ${URL} database.`)
	}
}

module.exports = {
	connectDatabase,

	// export all models
	models: {
		User: require('./models/user'),
		Message: require('./models/message'),
		Chat: require('./models/chat'),
		Token: require('./models/token'),
	},
}
