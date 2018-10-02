const Redis = require('./redis.js')
const Bcrypt = require('./bcrypt.js') 


module.exports = {
  set : function (obj) {
    return Redis.hmset('player', obj.name, JSON.stringify(obj))
  }
}
