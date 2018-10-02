const Redis = require('./redis.js')
const Bcrypt = require('./bcrypt.js') 


module.exports = {
  signup : async function signup (obj) {
    var salt = await Bcrypt.genSalt(10)
    obj.password = await Bcrypt.hash(obj.password.toString(), salt)
    return Redis.hmset('user', obj.username, JSON.stringify(obj))
  },

  login : async function login (obj) {
    try {
      var validuser = await Redis.hexists('user', obj.username)
      if (validuser) {
        var cred = JSON.parse(await Redis.hmget('user', obj.username)).password
        if (await Bcrypt.compare(obj.password, cred)) return true
        throw new Error(`Password didn't match`)
      }
      throw new Error(`Username doesn't exist`)
    } catch (e) {
      return e
    }
  }
}
