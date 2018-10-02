const model = require('../model/storymodel')
const axios = require('axios')

module.exports = {
  getAllStoriesIDs: async function getAllStories(req, res) {
    var storyIdArray = await model.getallstoryids()
    if (Array.isArray(storyIdArray)) return res.status(200).json(storyIdArray)
    return res.status(400).send('failed')
  },

  getHNStories: async (req, res) => {
    var result = await axios.get(`https://hacker-news.firebaseio.com/v0/${req.params.tabname}.json?print=pretty`)
    res.json(result.data).sendStatus(200)
  },

  postStories : async function postStories (req, res) {
    var status = await model.savestory(req.body)
    console.log(status, 'got status')
    if (status === 'OK') return res.status(201).send('success')
    return res.status(400).send('failed')
  },

  upvoteStory : async function upvoteStory (req, res) {
    if (!(typeof await model.upvote(req.body) === 'object')) {
      return res.status(200).send('success')
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