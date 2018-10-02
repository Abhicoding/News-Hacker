const model = require('../model/usermodel')
const axios = require('axios')

module.exports = {
  test: (req, res) => {
    res.sendStatus(200)
  },

  login: async function login (req, res) {
    if (req.session.username) return res.status(400).send('Error: Bad request')
    var check = await model.login(req.body)
    if (check === true) {
      req.session.username = req.body.username
      return res.status(200).send('success')
    }
    if (typeof check === "object") return res.status(401).send(`Error: ${check.message}`)
    return res.status(401).send('Error: Oops! something went wrong')
  },

  signup: async function signup (req, res) {
    if (req.session.username) return res.status(400).send('Error: Bad request')
    var check = await model.signup(req.body)
    if (typeof check === "object") return res.status(401).send(`Error: ${check.message}`)
    req.session.username = req.body.username
    res.status(201).send('success')
  },

  logout: function logout (req, res) {
    if (req.session.username) {
      return req.session.destroy(() => res.status(200).send('success'))
    }
    return res.status(400).send('Error: Bad request')
  }
}