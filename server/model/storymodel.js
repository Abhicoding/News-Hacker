const Redis = require('./redis.js');

module.exports = {
  savestory : async function saveStory (obj) {
    try {
      if (await Redis.hexists('story', obj.id)) throw new Error (`No reposts`)
      await Redis.lpush('storyIDs', obj.id)
      return await Redis.hset('story', obj.id, JSON.stringify(obj))
    } catch (e) {
      return e
    }
  },

  getallstoryids : async function getallstories () {
    try {
      return await Redis.lrange('storyIDs', 0, 199)
    } catch (e) {
      return e
    }
  },

  upvote : async function upvote (obj) {
    try {
      
      if (!(await Redis.hexists('story', obj.id))) {
        throw new Error (`Error with this story :(`)
      }
      var upvotedArray = await Redis.hget('upvotedby', obj.id)
      
      if (upvotedArray) {      // checks if array exists
        var temp = JSON.parse(upvotedArray)
        if (temp.includes(obj.user)) throw `No multiple upvotes`
        temp.push(obj.user)
        await Redis.hset('upvotedby', obj.id, JSON.stringify(temp))
      } else {                // creates if doesn't
        await Redis.hset('upvotedby', obj.id, JSON.stringify([obj.user]))
      }
      
      return await Redis.zincrby('score', 1, obj.id)

    } catch (e) {
      return e
    }
  },
  
  getstorybyid : async function getstorybyid (id) {
    try {
      return Promise.all([
        Redis.hget('story', id),
        Redis.zscore('score', id),
        Redis.hget('upvotedby', id)
      ])
    } catch (e) {
      return e
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
