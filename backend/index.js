const app = require('./app')
const connectDatabase = require('./database')
const port = require('./config').PORT

// connect to database
connectDatabase()

// start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
