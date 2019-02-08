var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(6969, function() {
  console.log('listening to request on Port 6969 :D')
});

//Static files
app.use(express.static("public"));

//Socket setup
var io = socket(server);

//Listen for socket connection from the client.
io.on('connection', function(socket) {
  console.log("Socket connected!", socket.id);

  //send back data to each socket connections(i.e. clients)
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
    console.log("Message sent from " + socket.id + "!");
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  })
});
