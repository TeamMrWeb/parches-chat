/**
 * @file Contains index routes.
 * @author Manuel Cabral
 * @version 0.0.1
 */

const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
	res.send('Parches Chat API')
})

module.exports = router
