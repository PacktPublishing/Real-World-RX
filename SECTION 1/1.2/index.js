const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

// initialize express app
const app = express()

// setup body parser middleware for json
app.use(bodyParser.json())
// create a server using express app
const server = http.createServer(app)

// demo route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  const name = req.body.name
  res.send(`Hello! ${name}`)
})

// start the server
server.listen(4000, () => {
  console.log('rx chat server running at port 4000')
})
