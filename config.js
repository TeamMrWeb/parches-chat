/**
 * @file Contains environment variables and some configuration.
 * @author Manuel Cabral
 * @version 0.0.4
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
		URL: process.env.MONGODB_URL || 'mongodb://localhost/parches-chat',
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
		EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || 'emailsecret',
		EMAIL_EXPIRES_IN: process.env.JWT_EMAIL_EXPIRES_IN || '1m',
	},

	// email
	EMAIL: {
		USER: process.env.EMAIL_USER || 'wow',
		PASSWORD: process.env.EMAIL_PASS || 'wow123',
		ADDRESS: process.env.EMAIL || null,
	},
}
