/**
 * @file Contains the user model.
 * @author Manuel Cabral
 * @version 0.0.3
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
