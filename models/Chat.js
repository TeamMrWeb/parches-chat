/**
 * @file Contains chat model.
 * @author Manuel Cabral
 * @version 0.0.2
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
		admins: [
			{
				type: Schema.Types.ObjectId,
				unique: true,
				ref: 'User',
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
