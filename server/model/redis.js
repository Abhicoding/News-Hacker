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

const hmset = promisify(client.hmset).bind(client)
const hexists = promisify(client.hexists).bind(client)
const hmget = promisify(client.hmget).bind(client)

module.exports = {
  hmset, hexists, hmget,client
}