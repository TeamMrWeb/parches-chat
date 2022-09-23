/**
 * @file Contain all email util tests.
 * @author Manuel Cabral
 * @version 0.0.2
 */
const { expect } = require('chai')

// required modules
const email = require('../../src/utils/email')

// antispam
const sendRealEmail = false

describe('Email', () => {
	it('should verify email credentials', async () => {
		const result = await email.checkEmailCredentials()
		expect(result).to.have.property('status')
		expect(result.status).to.be.true
	})

	it('should not verify an invalid email credentials', async () => {
		const result = await email.checkEmailCredentials(
			'noexist@gmail.com',
			'wtfpassword'
		)
		expect(result).to.have.property('status')
		expect(result.status).to.be.false
		expect(result.error).to.be.a('string')
	})

	it('should send an email', async () => {
		if (sendRealEmail) {
			const sent_to = 'manuandres864@gmail.com'
			const result = await email.sendEmail(sent_to, 'test', 'test')
			expect(result).to.have.property('status')
			expect(result).to.have.property('info')
			expect(result.status).to.be.true
			expect(result.info).to.have.property('accepted')
			expect(result.info.accepted).to.be.an('array')
			expect(result.info.accepted).to.include(sent_to)
		} else expect(true).to.be.true
	})

	it('should not send an email to an invalid email', async () => {
		const sent_to = '#@%^%#$@#$@#.com'
		const result = await email.sendEmail(sent_to, 'test', 'test')
		expect(result).to.have.property('status')
		expect(result).to.have.property('error')
		expect(result.status).to.be.false
		expect(result.error).to.be.a('string')
	})

	it('should not verify an invalid email', async () => {
		const result = await email.isValidEmail('jiji.com')
		expect(result).to.be.false
	})
})
