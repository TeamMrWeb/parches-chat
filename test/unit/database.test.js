/**
 * @file Contain all database unit tests.
 * @author Manuel Cabral
 * @version 0.0.1
 */
const { expect } = require('chai')

// required modules
const {
	closeDatabase,
	connectDatabase,
	checkDatabaseConnection,
} = require('../../src/database')

describe('Database', () => {
	beforeAll(async () => {
		await connectDatabase()
	})

	afterAll(async () => {
		await closeDatabase()
	})

	it('should connect to the database', async () => {
		const result = await checkDatabaseConnection()
		expect(result).to.be.true
	})

	it('should close the database connection', async () => {
		await closeDatabase()
		const result = await checkDatabaseConnection()
		expect(result).to.be.false
	})

	it('should throw an error if the database connection fails', async () => {
		try {
			await connectDatabase('mongodb://localhost:27017/invalid')
		} catch (err) {
			expect(err).to.be.an('error')
		}
	})
})
