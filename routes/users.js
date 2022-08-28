const router = require('express').Router()

router.get('/', (_, res) => {
	res.send('hi user')
})

module.exports = router
