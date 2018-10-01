const Redis = require('./redis.js')

module.exports = {
  set : function (obj) {
    console.log(obj)
    return Redis.hmset('player', obj.name, JSON.stringify(obj))
  }
}
