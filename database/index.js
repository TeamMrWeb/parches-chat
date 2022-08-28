/*
 * Contains all database connection settings.
 */

// required modules
const mongoose = require('mongoose')

// setting up
const connectDatabase = async () => {
	await mongoose.connect('mongodb://localhost/parches-chat')
	console.log('Database connected')
}

module.exports = connectDatabase
