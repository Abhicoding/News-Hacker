const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const router = require('./server/routes/routes')

app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api', router)

app.use(express.static('build'))

module.exports = app