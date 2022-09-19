/**
 * @file Contains all database things.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const mongoose = require('mongoose')
const URL = require('../config').DB.URL

// setting up
const connectDatabase = async () => {
	await mongoose.connect(URL)
	console.log(`Connected to ${URL} database successfully.`)
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
