/**
 * @file Conatains cloudinary related functions.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { CLOUDINARY } = require('../config')
const cloudinary = require('cloudinary').v2

// setting up
cloudinary.config({
	cloud_name: CLOUDINARY.CLOUD_NAME,
	api_key: CLOUDINARY.API_KEY,
	api_secret: CLOUDINARY.API_SECRET,
})

/**
 * Check if cloudinary is connected.
 * @returns {Boolean} - True if cloudinary is connected. Otherwise, false.
 */
const checkCloudinaryConnection = async () => {
	try {
		await cloudinary.api.ping()
		return true
	} catch (error) {
		return false
	}
}

/**
 * Uploads a file to cloudinary.
 * @param {String} path - The path of the file to upload.
 * @param {String} folder - The folder to upload the file to. Default uses the env
 * @returns {Object} - The result of the upload.
 * @throws {Error} If the upload fails.
 */
const uploadFile = async (path, folder) => {
	try {
		const result = await cloudinary.uploader.upload(path, {
			folder: folder || CLOUDINARY.FOLDER,
		})
		return result
	} catch (error) {
		throw new Error(error.message)
	}
}

/**
 * Deletes a file from cloudinary.
 * @param {String} publicId - The public id of the file to delete.
 * @returns {Object} - The result of the deletion.
 * @throws {Error} If the deletion fails.
 */
const deleteFile = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId)
		return result
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = {
	uploadFile,
	deleteFile,
	checkCloudinaryConnection,
}
