/**
 * @file Contains environment variables and some configuration.
 * @author Manuel Cabral
 * @version 0.0.1
 */

const config = require('dotenv').config

// load environment variables
config()

// export configuration
module.exports = {
	// server port
	PORT: process.env.PORT || 3000,

	// database connection
	DB: {
		URI: process.env.MONGODB_URI || 'mongodb://localhost/parches-chat',
		OPTIONS: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		},
	},

	// json web token
	JWT: {
		SECRET: process.env.JWT_SECRET || 'supersecret',
		EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
	},
}
