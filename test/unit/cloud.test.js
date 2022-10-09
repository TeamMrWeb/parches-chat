/**
 * @file Contain all cloud unit tests.
 * @author Manuel Cabral
 * @version 0.0.1
 */
const { expect } = require('chai')

// required modules
const { checkCloudinaryConnection } = require('../../src/utils/cloudinary')

describe('Cloud', () => {
	it('should check if cloudinary is connected', async () => {
		const result = await checkCloudinaryConnection()
		expect(result).to.be.true
	})
})
