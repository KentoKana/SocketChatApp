//make connection
//Connected via CDN in index.html
var socket = io.connect("http://localhost:6969");

//DOM queries
const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

//Emit Events

btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function() {
  socket.emit("typing", handle.value);
});

//Listen for events
socket.on('chat', function(data) {
  feedback.innerHTML = "";
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message +
    "</p>";
  console.log("Message sent from " + socket.id);
});

socket.on('typing', function(data) {
  feedback.innerHTML = "<p><em>" + data +
    " is typing a message... </em></p>";
});
