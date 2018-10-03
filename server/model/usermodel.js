const Redis = require('./redis.js')
const Bcrypt = require('./bcrypt.js') 


module.exports = {

  signup : async function signup (obj) {
    try {
      if (obj.username.length < 6) throw new Error(`Username too small`)
      if (obj.password.length < 6) throw new Error(`Password too small`)
      var validuser = await Redis.hexists('user', obj.username)
      if (validuser) throw new Error(`User already exists`)
      var salt = await Bcrypt.genSalt(10)
      obj.password = await Bcrypt.hash(obj.password.toString(), salt)
      return await Redis.hset('user', obj.username, JSON.stringify(obj))
    } catch (e) {
      return e
    }
  },

  login : async function login (obj) {
    try {
      var validuser = await Redis.hexists('user', obj.username)
      if (validuser) {
        var cred = JSON.parse(await Redis.hget('user', obj.username)).password
        if (await Bcrypt.compare(obj.password, cred)) return true
        throw new Error(`Password didn't match`)
      }
      throw new Error(`Username doesn't exist`)
    } catch (e) {
      return e
    }
  }
}
