/**
 * @file Contains server basic tests.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')

// setting up
chai.use(chaiHttp)
const request = chai.request
const expect = chai.expect

// tests
describe('Server Status', () => {
	describe('GET /', () => {
		it('should return a 200 status code', async () => {
			const response = await request(app).get('/')
			expect(response).to.have.status(200)
		})
	})

	describe('GET /graphql', () => {
		it('should return a 200 status code and Hello World!', async () => {
			const response = await request(app)
				.get('/graphql')
				.query({ query: '{hello}' })
			expect(response).to.have.status(200)
			expect(response.body.data.hello).to.be.equal('Hello World!')
		})
	})
})
