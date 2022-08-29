/**
 * @file Contains chat model.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { Schema, model } = require('mongoose')

const chatSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		messages: [
			{
				type: Schema.Types.ObjectId,
				unique: true,
				ref: 'Message',
			},
		],
		users: [
			{
				type: Schema.Types.ObjectId,
				unique: true,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Chat', chatSchema)
