const model = require('../model/storymodel')
const uniqid = require('uniqid')

module.exports = {
  getAllStoryIDs: async function getAllStoryIDs (req, res) {
    var storyIdArray = await model.getallstoryids()
    if (Array.isArray(storyIdArray)) return res.status(200).json(storyIdArray)
    return res.status(400).send('failed')
  },

  postStories: async function postStories (req, res) {
    if (req.session.username) {
      try {
        var data = req.body
        data.by = req.session.username
        data.id = uniqid.time()
        data.score = 0
        var status = await model.savestory(data)
        if (status) return res.status(201).send('success')
      } catch (e) {
        return res.status(400).send(e.message)
      }
    }
    return res.status(400).send('failed')
  },

  upvoteStory: async function upvoteStory (req, res) {
    if (req.session.username) {
      try {
        var result = await model.upvote(req.body.id, req.session.username)
        // console.log(result, 'UPVOTE RESULT')
        if (typeof Number(result) === 'number') {
          return res.status(200)
            .json({ id: req.body.id, score: result, didupvote: true })
        }
      } catch (e) {
        return res.status(400).send(e.message)
      }
    }
    return res.status(400).send('failed')
  },

  unupvoteStory: async function unupvoteStory (req, res) {
    // console.log(req.body.id, req.session.username, 'INSIDE UNUPVOTE')
    try {
      var user = req.session.username
      if (user) {
        var result = await model.unupvote(req.body.id, user)
        if (typeof Number(result) === 'number') {
          return res.status(200)
            .json({ id: req.body.id, score: Number(result), didupvote: false })
        }
      }
      return res.status(400).send('failed')
    } catch (e) {
      return res.status(400).send(e.message)
    }
  },

  getStorybyID: async function getStorybyID (req, res) {
    try {
      var id = req.params.id
      var data = await model.getstorybyid(id)
      var story = JSON.parse(data[0])
      if (story === null) throw new Error(`No such story`)
      story.time = Date.now() - story.time
      if (req.session.username) {
        var user = req.session.username
        var didupvote = await model.checkupvoted(id, user)
        story.didupvote = !!didupvote
      }
      story.score = data[1] === null ? 0 : data[1]
    } catch (e) {
      return res.status(400).json(e.message)
    }
    return res.status(200).json(story)
  }
}
