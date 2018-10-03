const router = require('express').Router()
const controller = require('../controller/storycontroller')

router.get('/allstoryids', controller.getAllStoryIDs)
router.get('/get/:id', controller.getStorybyID)

router.post('/poststory', controller.postStories)
router.post('/upvote', controller.upvoteStory)


module.exports = router