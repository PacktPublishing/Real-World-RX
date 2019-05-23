const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const socket = require('socket.io')

// initialize express app
const app = express()
// create a server using express app
const server = http.createServer(app)

// setup body parser middleware for json
app.use(bodyParser.json())

// initialize socket io with server
const io = socket(server)

// socket logic on connect

//socket logic for post message
app.post('/message', (req, res) => {
  io.emit('message', req.body)
})
// socket logic on disconnect

// demo route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// start the server
server.listen(4000, () => {
  console.log('rx chat server running at port 4000')
})
