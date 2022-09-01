/**
 * @file Contains the user model.
 * @author Manuel Cabral
 * @version 0.0.4
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
			select: false,
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
		status: {
			type: Int,
			default: 0,
			enum: [0, 1, 2, 3], // 0: active, 1: idle, 2: not disturb, 3: offline
		},
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		pendingFriends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		blockedUsers: [
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

module.exports = model('User', userSchema)
