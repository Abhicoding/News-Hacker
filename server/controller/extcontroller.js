const axios = require('axios')
const cheerio = require('cheerio')
const controller = require('./storycontroller')
const model = require('../model/storymodel')


module.exports = {
  getStoryIDs: async (req, res) => {
    if (req.params.tabname !== 'nhstories') {
      try {
        var result = await axios.get(`https://hacker-news.firebaseio.com/v0/${req.params.tabname}.json?print=pretty`)
        res.json(result.data).sendStatus(200)
      } catch (e) {
        res.json(e.message).sendStatus(400)
      }
    }
    return controller.getAllStoryIDs(req, res)
  },
  getTitle : async function getTitle (req, res) {
    try {
      var html = await axios.get(req.body.url)
      var dom = cheerio.load(html.data)
      var title = dom('title').text()
      res.status(200).send(title)
    } catch (e) {
      res.status(400).send('failed')
    }
  },

  getStory : async function getStory (req, res) {
    if (req.params.tabname !== 'nhstories') {
      try{
        var result = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${req.params.id}.json?`)
        res.json(result.data).sendStatus(200)
      } catch (e) {
        res.status(400).send(e.message)
      }
    }
    return controller.getStorybyID(req, res)
  }
}