const router = require('express').Router()
const controller = require('../controller/extcontroller')

router.get('/v0/:tabname', controller.getHNStories)
router.post('/title', controller.getTitle)

module.exports = router