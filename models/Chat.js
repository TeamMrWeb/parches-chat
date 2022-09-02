/**
 * @file Contains chat model.
 * @author Manuel Cabral
 * @contributor Leo Araya
 * @version 0.0.5
 */

// required modules
const { Schema, model } = require('mongoose')

const chatSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Message',
			},
		],
		isGroup: {
			type: Boolean,
			required: true,
		},
		secure: {
			type: Boolean,
			default: false,
		},
		ownerId: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		admins: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		users: [
			{
				type: Schema.Types.ObjectId,
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
