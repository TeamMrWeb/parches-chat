/**
 * @file Contains all routes for users.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const router = require('express').Router()

router.get('/', (_, res) => {
	res.send('hi user')
})

module.exports = router
