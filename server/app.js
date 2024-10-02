const express = require('express')
const http = require('http');
const { Server } = require('socket.io');
const app = express()
const port = 3000

const App = http.createServer(app);
const server = new Server(App);

const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})