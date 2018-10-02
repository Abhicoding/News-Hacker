const router = require('express').Router()
const controller = require('../controller/storycontroller')

router.get('/allstories', controller.getAllStories)
router.get('/v0/:tabname', controller.getHNStories)
router.post('/post:id', controller.postStories)

module.exports = router