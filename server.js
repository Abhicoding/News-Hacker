const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userrouter = require('./server/routes/userroutes')
const storyrouter = require('./server/routes/storyroutes')

app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api/user', userrouter)
app.use('/api/story', storyrouter)

app.use(express.static('build'))

module.exports = app