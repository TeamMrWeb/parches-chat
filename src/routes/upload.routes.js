/**
 * @file Contains upload routes.
 * @author Manuel Cabral
 * @version 0.0.1
 */

const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const { uploadAvatar } = require('../controllers/uploadController')

/**
 * Uploads a file to the server, then uploads it to cloudinary.
 * NOTE: Only accepts images for now.
 */
router.post(
	'/avatar',
	fileUpload({
		useTempFiles: true,
		tempFileDir: './tmp',
	}),
	uploadAvatar
)

module.exports = router
