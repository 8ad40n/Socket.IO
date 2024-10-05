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
  console.log("ID:", socket.id);

  // // message emitted from server
  // socket.emit("welcome", `welcome to the server emit, ${socket.id}`);

  // // message broadcasted from server
  // // here, the rest of the users can see the message
  // socket.broadcast.emit("welcome1", `${socket.id} joined the server`);


  socket.on("message", ({ room, message }) => {
    // io.emit("receive-message", message);    
    // socket.broadcast.emit("receive-message", message);
    console.log({ room, message });
    io.to(room).emit("receive-message", message);
  });

  socket.on("joinRoom", (room)=>{
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
