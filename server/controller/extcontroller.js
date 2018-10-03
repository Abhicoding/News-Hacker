const axios = require('axios')
const cheerio = require('cheerio')


module.exports = {
  getHNStories: async (req, res) => {
    var result = await axios.get(`https://hacker-news.firebaseio.com/v0/${req.params.tabname}.json?print=pretty`)
    res.json(result.data).sendStatus(200)
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
  }
}