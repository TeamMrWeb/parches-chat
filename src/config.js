/**
 * @file Contains environment variables and some configuration.
 * @author Manuel Cabral
 * @version 0.0.8
 */

const config = require('dotenv').config

// load environment variables
config()

// export configuration
module.exports = {
	// server port
	PORT: process.env.PORT || 4000,

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

	// cloudinary
	CLOUDINARY: {
		CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		API_KEY: process.env.CLOUDINARY_API_KEY,
		API_SECRET: process.env.CLOUDINARY_API_SECRET,
	},

	// json web token
	JWT: {
		SECRET: process.env.JWT_SECRET || 'supersecret',
		EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
		EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || 'emailsecret',
		EMAIL_EXPIRES_IN: process.env.JWT_EMAIL_EXPIRES_IN || '5m',
	},

	// email
	EMAIL: {
		USER: process.env.EMAIL_USER,
		PASSWORD: process.env.EMAIL_PASS,
		ADDRESS: process.env.EMAIL,
	},
}
