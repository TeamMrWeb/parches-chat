/**
 * @file Contain all cloud unit tests.
 * @author Manuel Cabral
 * @version 0.0.2
 */
const { expect } = require('chai')

// required modules
const {
	checkCloudinaryConnection,
	uploadFile,
	deleteFile,
	getFile,
} = require('../../src/services/cloudinary')

let public_id = ''
const test_image = 'test/unit/resources/kitty.jpg'
const test_folder = 'test'

describe('Cloud', () => {
	it('should check if cloudinary is connected', async () => {
		const result = await checkCloudinaryConnection()
		expect(result).to.be.true
	})
	it('should upload a file to cloudinary', async () => {
		const result = await uploadFile(test_image, test_folder)
		public_id = result.public_id
		expect(result).to.be.an('object')
		expect(result).to.have.property('public_id')
		expect(result).to.have.property('version')
		// ...
	})
	it('should get a file from cloudinary', async () => {
		const result = await getFile(public_id)
		expect(result).to.be.an('object')
		expect(result).to.have.property('public_id')
		expect(result).to.have.property('version')
		// ...
	})
	it('should fail to get a file from cloudinary', async () => {
		try {
			await getFile('test')
		} catch (error) {
			expect(error).to.be.an('error')
		}
	})
	it('should remove a file from cloudinary', async () => {
		const result = await deleteFile(public_id)
		expect(result).to.be.an('object')
		expect(result).to.have.property('result')
	})
})
