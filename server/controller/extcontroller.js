const axios = require('axios')
const cheerio = require('cheerio')
const controller = require('./storycontroller')
// const model = require('../model/storymodel')

module.exports = {
  getStoryIDs: async (req, res) => {
    // console.log(req.params)
    if (req.params.tabname !== 'nhstories') {
      try {
        var result = await axios.get(`https://hacker-news.firebaseio.com/v0/${req.params.tabname}.json?print=pretty`)
        return res.status(200).json(result.data)
      } catch (e) {
        return res.status(400).json(e.message)
      }
    }
    return controller.getAllStoryIDs(req, res)
  },

  getTitle: async function getTitle (req, res) {
    try {
      var html = await axios.get(req.body.url)
      var dom = cheerio.load(html.data)
      var title = dom('title').text()
      return res.status(200).send(title)
    } catch (e) {
      return res.status(400).send('failed')
    }
  },

  getStory: async function getStory (req, res) {
    // console.log(req.params)
    if (req.params.tabname !== 'nhstories') {
      try {
        var result = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${req.params.id}.json?`)
        return res.status(200).json(result.data)
      } catch (e) {
        return res.status(400).send(e.message)
      }
    }
    // console.log(req.params)
    return controller.getStorybyID(req, res)
  },

  getItem: async function getItem (req, res) {
    try {
      var result = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${req.params.id}.json?print=pretty`)
      return res.status(200).send(result.data)
    } catch (e) {
      return res.status(400).send(e.message)
    }
  }
}
