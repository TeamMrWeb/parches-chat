/**
 * @file Contains all cast functions.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { ObjectId } = require('mongoose').Types

/**
 * Casts a string to an ObjectId.
 * @param {string} id - The string to cast.
 * @returns {ObjectId} The casted ObjectId.
 */
const ToObjectId = (id) => ObjectId(id)

module.exports = {
	ToObjectId,
}
