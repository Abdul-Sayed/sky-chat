const express = require('express');
const app = express();
const socket = require('socket.io');

// Serve static html file in public folder
app.use(express.static('public'));

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});


// Setup socket to use the express server thats running
const io = socket(server);

// Listen for when a client connection instance is established, and fire a callback
io.on('connection', (socket) => {
  console.log(`New Connection Established with id: ${socket.id}`);

  // listen for client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected. Session id ${socket.id} cleared.`)
  })

  // Listen for client emission called "message"
  // Re-emit recieved data to all clients (including to sender client)
  // io.sockets.emit('name of emission', {data sent to clients})
  // io.emit('name of emission', {data sent to clients})
  socket.on('message', data => {
    console.log(data);
    io.emit('message', data);
  })

  // Listen for client emission called typing
  // Re-Broadcast recieved data to all clients BESIDES sender client
  // socket.broadcast.emit('name of emission', {data sent to clients})
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })

})