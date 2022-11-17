/**
 * @file Contains index routes.
 * @author Manuel Cabral
 * @version 0.0.2
 */

const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
	res.send('Welcome to parches-chat API from backend development :-)')
})

module.exports = router
