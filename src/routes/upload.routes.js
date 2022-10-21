/**
 * @file Contains upload routes.
 * @author Manuel Cabral
 * @version 0.0.2
 */

const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
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
		tempFileDir: './tmp',
	}),
	uploadAvatar
)

router.post(
	'/chatavatar/:id',
	fileUpload({
		useTempFiles: true,
		tempFileDir: './tmp',
	}),
	uploadChatImage
)

router.post(
	'/messageimage/:chatId/:messageId',
	fileUpload({
		useTempFiles: true,
		tempFileDir: './tmp',
	}),
	uploadMessageImage
)

module.exports = router
