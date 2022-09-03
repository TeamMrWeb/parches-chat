/**
 * @file Contains token model.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { Schema, model } = require('mongoose')
const { EMAIL_EXPIRES_IN } = require('../config').JWT

const tokenSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		expires: EMAIL_EXPIRES_IN,
		versionKey: false,
	}
)

module.exports = model('Token', tokenSchema)
