/**
 * @file Contains the user model.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { Schema, model } = require('mongoose')

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i,
				'Please a valid email address',
			],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('User', userSchema)
