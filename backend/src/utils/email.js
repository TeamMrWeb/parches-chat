/**
 * @file Contains email related functions.
 * @author Manuel Cabral
 * @version 0.0.2
 */

// required modules
const nodemailer = require('nodemailer')
const { ADDRESS, USER, PASSWORD } = require('../config').EMAIL

/**
 * Send an simple email.
 * @param {String} to - The email address to send the email to.
 * @param {String} subject - The subject of the email.
 * @param {String} text - The text of the email.
 */
const sendEmail = async (to, subject, text) => {
	console.log('enviando email desde ', ADDRESS, PASSWORD)
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: ADDRESS,
			pass: PASSWORD,
		},
	})

	const mailOptions = {
		from: ADDRESS,
		to,
		subject,
		html: text,
	}

	try {
		await transporter.sendMail(mailOptions)
	} catch (error) {
		console.log(error)
	}
}

/**
 * Check if email credentials are correct.
 * @throws {Error} If credentials are incorrect.
 */
const checkEmailCredentials = async () => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: ADDRESS,
			pass: PASSWORD,
		},
	})

	try {
		await transporter.verify()
	} catch (error) {
		throw new Error('Email credentials are not valid.')
	}
}

module.exports = {
	sendEmail,
	checkEmailCredentials,
}
