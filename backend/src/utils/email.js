/**
 * @file Contains email related functions.
 * @author Manuel Cabral
 * @version 0.0.5
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
		const info = await transporter.sendMail(mailOptions)
		return {
			status: true,
			info,
		}
	} catch (error) {
		return {
			status: false,
			error: error.message,
		}
	}
}

/**
 * Check if email credentials are correct. If no credentials are provided, it uses the config file.
 * @param {String} user - The email address to send the email to.
 * @param {String} password - The password of the email.
 * @returns {Boolean} - True if credentials are correct. Otherwise, false.
 * @throws {Error} If credentials are incorrect.
 */
const checkEmailCredentials = async (address, password) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: address || ADDRESS,
				pass: password || PASSWORD,
			},
		})
		return { status: await transporter.verify() }
	} catch (error) {
		return { status: false, error: error.message }
	}
}

/**
 * Check if a email is valid.
 * @param {String} email - The email to check.
 * @returns {Boolean} - True if email is valid. Otherwise, false.
 */
const isValidEmail = (email) => {
	const re = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i
	return re.test(String(email).toLowerCase())
}

module.exports = {
	sendEmail,
	isValidEmail,
	checkEmailCredentials,
}
