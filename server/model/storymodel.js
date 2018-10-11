const Redis = require('./redis.js')

module.exports = {
  savestory: async function saveStory (obj) {
    try {
      if (await Redis.hexists('story', obj.id)) throw new Error(`No reposts`)
      await Redis.lpush('storyIDs', obj.id)
      return await Redis.hset('story', obj.id, JSON.stringify(obj))
    } catch (e) {
      return e
    }
  },

  getallstoryids: async function getallstories () {
    try {
      return await Redis.lrange('storyIDs', 0, 199)
    } catch (e) {
      return e
    }
  },

  upvote: async function upvote (id, user) {
    try {
      if (!(await Redis.hexists('story', id))) {
        throw new Error(`Error with this story :(`)
      }
      if (!await Redis.sadd(id, user)) {
        throw new Error(`Cannot upvote multiple times`)
      }
      return Redis.zincrby('score', 1, id)
    } catch (e) {
      throw e
    }
  },

  getstorybyid: async function getstorybyid (id) {
    try {
      return Promise.all([
        Redis.hget('story', id),
        Redis.zscore('score', id)
      ])
    } catch (e) {
      return e
    }
  },

  checkupvoted: async function checkupvoted (id, user) {
    try {
      return Redis.sismember(id, user)
    } catch (e) {
      return e
    }
  },

  unupvote: async function unupvote (id, user) {
    try {
      if (await Redis.sismember(id, user)) {
        if (!(await Redis.hexists('story', id))) {
          throw new Error(`Error with this story :(`)
        }
        if (!await Redis.srem(id, user)) {
          throw new Error(`This story cannot be unupvoted`)
        }
        return await Redis.zincrby('score', -1, id)
      }
      throw new Error(`Cannot unupvote the unupvoted`)
    } catch (e) {
      throw e
    }
  }
  // savestoryid : async function savestoryid (id) {
  //   try {
  //     if (typeof id !== 'string') throw new Error(`Bad story id`)
  //     return await Redis.multi().lpush('storyids', id).
  //   } catch (e) {
  //     return e
  //   }
  // }
}

// async function test () {
//   var result = await Redis.sismember('jmsqi0', 'Abhishek')
//   console.log(result, typeof result, Array.isArray(result), 'RESULT')
// }

// test()
