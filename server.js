/*
 * Contains all backend things for parches-chat application.
 */

// required modules
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP

// setting up
const app = express()
const schema = require('./graphql/schemas')
const connectDatabase = require('./database')
const port = 3000 || process.env.PORT

connectDatabase()

// express routes
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
)
app.use('/users', require('./routes/users'))

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
