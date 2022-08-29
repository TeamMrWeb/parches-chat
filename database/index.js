/**
 * @file Contains all database things.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const mongoose = require('mongoose')

// setting up
const connectDatabase = async () => {
	await mongoose.connect('mongodb://localhost/parches-chat')
	console.log('Database connected')
}

module.exports = connectDatabase
