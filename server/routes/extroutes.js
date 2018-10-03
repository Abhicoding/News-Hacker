const router = require('express').Router()
const controller = require('../controller/extcontroller')

router.get('/storyids/:tabname', controller.getStoryIDs)
router.get('/story/:tabname/:id', controller.getStory)
router.post('/title', controller.getTitle)

module.exports = router