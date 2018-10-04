const express = require('express')
const app = express()

const path = require('path')
const compression = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')
const redisStore = require('connect-redis')(session)

const client = require('./server/model/redis').client
const userrouter = require('./server/routes/userroutes')
const storyrouter = require('./server/routes/storyroutes')
const extrouter = require('./server/routes/extroutes')

var morgan
if (!process.env.NODE_ENV=='production') {
  morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use(session({
  secret: '42',
  store: new redisStore({client, ttl: 300}),
  saveUninitialized: false,
  resave: false
}))


app.use(compression())
app.use(bodyParser.json())

app.use('/api/user', userrouter)
app.use('/api/story', storyrouter)
app.use('/api/ext', extrouter)

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })

module.exports = app