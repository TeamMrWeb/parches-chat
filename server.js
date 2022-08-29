/**
 * @file Contains all backend things for parches-chat application.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const authenticate = require('./middlewares/auth')

// setting up
const app = express()
const schema = require('./graphql/schemas')
const connectDatabase = require('./database')
const port = 3000 || process.env.PORT

connectDatabase()

// express routes
app.use(authenticate)
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
