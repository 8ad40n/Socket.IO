const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3000;

const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("ID", socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
