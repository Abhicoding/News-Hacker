const model = require('../model/storymodel')
const  uniqid = require('uniqid')

module.exports = {
  getAllStoriesIDs: async function getAllStories(req, res) {
    var storyIdArray = await model.getallstoryids()
    if (Array.isArray(storyIdArray)) return res.status(200).json(storyIdArray)
    return res.status(400).send('failed')
  },

  postStories : async function postStories (req, res) {
    if (req.session.username) {
      var data = req.body
      data.by = req.session.username
      data.id = uniqid.time()
      data.score =0
      var status = await model.savestory(data)
      if (status === 'OK') return res.status(201).send('success')
    }
    return res.status(400).send('failed')
  },

  upvoteStory : async function upvoteStory (req, res) {
    if (req.session.username === req.body.by) {
      if (!(typeof await model.upvote(req.body) === 'object')) {
        return res.status(200).send('success')
      }
    }
    return res.status(400).send('failed')
  },

  getStorybyID: async function getStorybyID (req, res) {
    try {
      var data = await model.getstorybyid(req.params.id)
      var didupvote = Array.isArray(data[2]) 
        ? data[2].includes(req.session.username)
        : false
      var story = JSON.parse(data[0])
      story.didupvote = didupvote
      story.score = data[1]
    } catch (e) {
      return res.status(400).json(e.message)  
    }
    return res.status(200).json(story)
  }
}