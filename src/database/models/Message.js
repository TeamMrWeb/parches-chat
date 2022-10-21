/**
 * @file Contains message model.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const { Schema, model } = require('mongoose')

const messageSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		image: {
			exists: {
				type: Boolean,
				default: false,
			},
			public_id: {
				type: String,
			},
			secure_url: {
				type: String,
			},
		},
		seen: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		edited: {
			type: Boolean,
			default: false,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Message', messageSchema)
