const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static('build'))

module.exports = app