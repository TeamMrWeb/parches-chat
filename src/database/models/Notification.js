/**
 * @file Contains notification model
 * @author Leo Araya
 * @version 0.0.1
 */

// default modules required obviusly :)
const { Schema, model } = require('mongoose')

const notificationSchema = new Schema(
    {
        notification: {
            type: String
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Data,
            default: Date.now
        }
    }
)

module.exports = model("Notification", notificationSchema)