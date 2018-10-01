const model = require('../model/model.js')

module.exports = {
  test1: (req, res) => {
    console.log('logging')
    res.status(200).json({'test': 1})    // var content = await req.json()
    // model
  },
  test2: async (req, res) => {
    var body = await req.body
    console.log(body)
    model.set(body).then(() => {
      res.status(200).json('success')   // var content = await req.json()
    })
      // model
  }
}