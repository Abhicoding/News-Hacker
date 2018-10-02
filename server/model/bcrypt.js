const bcrypt = require('bcrypt');
const {promisify} = require('util')

const genSalt = promisify(bcrypt.genSalt).bind(bcrypt)
const hash = promisify(bcrypt.hash).bind(bcrypt)
const compare = promisify(bcrypt.compare).bind(bcrypt)

module.exports = {genSalt, hash, compare}