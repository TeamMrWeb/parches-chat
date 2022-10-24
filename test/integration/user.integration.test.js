/**
 * @file Contains user integration tests.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')
const { connectDatabase, closeDatabase } = require('../../src/database')
const userController = require('../../src/controllers/userController')

// setting up
chai.use(chaiHttp)
const request = chai.request
const expect = chai.expect

// useful variables
let token = ''
let userObject = {}
const user_payload = require('../resources/user_payload.json')

// tests
describe('User Integration', () => {
	after(async () => {
		await connectDatabase()
		try {
			userObject = await userController.createUser(user_payload)
		} catch (err) {
			// The user example already exists. We only find it.
			userObject = await userController.findOne({ email: user_payload.email })
		}
		// lets force the user to be verified
		userObject.verified = true
		await userObject.save()
	})

	before(async () => {
		await closeDatabase()
	})

	describe('POST /graphql/mutation/login', async () => {
		it('should login a user and return a token', async () => {
			query = `mutation { login(email:"${user_payload.email}", password:"${user_payload.password}") }`
			const response = await request(app).post('/graphql').send({ query })
			token = response.body.data.login
			expect(response).to.have.status(200)
			expect(response.body).to.have.property('data')
			expect(response.body.data).to.have.property('login')
			expect(response.body.data.login).to.be.a('string')
		})
	})
})
