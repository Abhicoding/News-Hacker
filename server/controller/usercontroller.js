const model = require('../model/usermodel')
const axios = require('axios')

module.exports = {
  test: (req, res) => {
    res.sendStatus(200)
  },

  login: async (req, res) => {
    var check = await model.login(req.body)
    if (check === true) return res.status(200).send('success')
    if (typeof check === "object") return res.status(401).send(check.message)
    return res.status(401).send('Oops! something went wrong')
  },

  signup: (req, res) => {
    model.signup(req.body)
    res.sendStatus(200)
  },

  logout: (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
  }
}