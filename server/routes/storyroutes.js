const router = require('express').Router()
const controller = require('../controller/storycontroller')

router.get('/allstoryids', controller.getAllStoriesIDs)
router.get('/get/:id', controller.getStorybyID)
router.get('/v0/:tabname', controller.getHNStories)
router.post('/poststory', controller.postStories)
router.post('/upvote', controller.upvoteStory)


module.exports = router