/**
 * @file Contain all database unit tests.
 * @author Manuel Cabral
 * @version 0.0.4
 */
const { expect } = require('chai')

// required modules
const {
	closeDatabase,
	connectDatabase,
	checkDatabaseConnection,
} = require('../../src/database')
const userController = require('../../src/controllers/userController')

// useful variables
const user_payload = require('../resources/user_payload.json')
let userObject = null

describe('Database', () => {
	before(async () => {
		await connectDatabase()
	})
	after(async () => {
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

/**
 * TODO: Add more user tests from the userController.
 */
describe('User Database', () => {
	before(async () => {
		await connectDatabase()
	})

	after(async () => {
		await closeDatabase()
	})

	it('should create a new user', async () => {
		const user = await userController.findOne({ email: user_payload.email })
		if (user) await userController.removeUser(user._id)
		const result = await userController.createUser(user_payload)
		// catch user object for later tests
		userObject = result
		expect(result).to.be.an('object')
		expect(result).to.have.property('username')
		expect(result).to.have.property('email')
		expect(result).to.have.property('password')
		expect(result).to.have.property('_id')
		expect(result.username).to.equal(user_payload.username)
		// ...
	})

	it('should fail to create a repeated user', async () => {
		try {
			await userController.createUser(user_payload)
		} catch (err) {
			expect(err).to.be.an('error')
		}
	})

	it('should find a user by id', async () => {
		const userId = userObject._id
		const result = await userController.findById(userId)
		expect(result).to.be.an('object')
		expect(result).to.have.property('username')
		expect(result).to.have.property('email')
		expect(result).to.have.property('password')
		expect(result).to.have.property('_id')
		expect(result.username).to.equal(user_payload.username)
		// ...
	})

	it('should find a user by email', async () => {
		const result = await userController.findOne({ email: user_payload.email })
		expect(result).to.be.an('object')
		expect(result).to.have.property('username')
		expect(result).to.have.property('email')
		expect(result).to.have.property('password')
		expect(result).to.have.property('_id')
		expect(result.username).to.equal(user_payload.username)
		// ...
	})

	it('should remove a user', async () => {
		await userController.removeUser(userObject._id)
		const user = await userController.findById(userObject._id)
		expect(user).to.be.null
	})
})
