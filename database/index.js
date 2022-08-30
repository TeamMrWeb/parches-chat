/**
 * @file Contains all database things.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const mongoose = require('mongoose')
const URL = require('../config').DB.URL

// setting up
const connectDatabase = async () => {
	await mongoose.connect(URL)
	console.log(`Connected to ${URL} database`)
}

module.exports = connectDatabase
