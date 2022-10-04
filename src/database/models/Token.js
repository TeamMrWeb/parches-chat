/**
 * @file Contains token model.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const { Schema, model } = require('mongoose')
const { EMAIL_EXPIRES_IN } = require('../../config').JWT

const tokenSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		createdAt: {
			type: Date,
			expires: EMAIL_EXPIRES_IN,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
)

module.exports = model('Token', tokenSchema)
