const model = require('../model/storymodel')
const axios = require('axios')

module.exports = {
  getAllStories: (req, res) => {
    console.log('get request for stories')
    res.sendStatus(200)
  },

  getHNStories: async (req, res) => {
    console.log('got request for HNStories', req.params.tabname)
    var result = await axios.get(`https://hacker-news.firebaseio.com/v0/${req.params.tabname}.json?print=pretty`)
    // var data = await result
    res.json(result.data).sendStatus(200)
  },

  postStories: (req, res) => {
    console.log('got request for postingstory', req.body, req.params.id)
    res.sendStatus(200)
  }
}