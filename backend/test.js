/**
 * @file Contains all basic tests.
 * @author Manuel Cabral
 * @version 0.0.4
 */

// required modules
const supertest = require('supertest')

// setting up
const app = require('./app')
const requestWithSupertest = supertest(app)

// tests

describe('GET GraphQL/query/hello', () => {
	it('should return a Hello World!', async () => {
		const response = await requestWithSupertest.get('/graphql?query={hello}')
		expect(response.body.data.hello).toBe('Hello World')
	})
})

describe('POST fake GraphQL/mutation/login', () => {
	it('should return null', async () => {
		query = `mutation { login(email: "test@gmail.com", password: "123456") }`
		const response = await requestWithSupertest.post('/graphql').send({ query })
		expect(response.body.data.login).toBe(null)
	})
})
