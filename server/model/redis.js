const redis = require('redis')
const url = require('url')
const {promisify} = require('util')
let client
if (process.env.REDISCLOUD_URL) {
  const redisURL = url.parse(process.env.REDISCLOUD_URL)
  client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true})
  client.auth(redisURL.auth.split(':')[1])

  client.on('connect', function () {
    console.log('connected Redis')
  })
}

//if (process.env.NODE_ENV === 'development') {
  //console.log('logged here')
client = redis.createClient()
client.on('connect', function () {
  console.log('connected Redis')
})
//}

const hset = promisify(client.hset).bind(client)
const hexists = promisify(client.hexists).bind(client)
const hget = promisify(client.hget).bind(client)
// const hgetall = promisify(client.hgetall).bind(client)
const lrange = promisify(client.lrange).bind(client)
const lpush = promisify(client.lpush).bind(client)
const zincrby = promisify(client.zincrby).bind(client)
const zscore = promisify(client.zscore).bind(client)
// const multi = promisify(client.multi).bind(client)
// const exec = promisify(client.exec).bind(client)

module.exports = {
  hset, 
  hexists, 
  hget,
  // hgetall,
  lrange,
  lpush,
  zincrby,
  zscore,
  // multi,
  // exec,
  client
}