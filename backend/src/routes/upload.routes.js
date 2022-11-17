/**
 * @file Contains upload routes.
 * @author Manuel Cabral
 * @version 0.0.3
 */

const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const { TEMP_FOLDER } = require('../config').CLOUDINARY
const {
	uploadAvatar,
	uploadChatImage,
	uploadMessageImage,
} = require('../controllers/uploadController')

/**
 * Uploads a file to the server, then uploads it to cloudinary.
 * NOTE: Only accepts images for now.
 */

router.post(
	'/avatar',
	fileUpload({
		useTempFiles: true,
		tempFileDir: TEMP_FOLDER,
	}),
	uploadAvatar
)

router.post(
	'/chatavatar/:id',
	fileUpload({
		useTempFiles: true,
		tempFileDir: TEMP_FOLDER,
	}),
	uploadChatImage
)

router.post(
	'/messageimage/:chatId/:messageId',
	fileUpload({
		useTempFiles: true,
		tempFileDir: TEMP_FOLDER,
	}),
	uploadMessageImage
)

module.exports = router
