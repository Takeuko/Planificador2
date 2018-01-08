let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
io.on('connection', (socket) => 
{

 
 
  socket.on('set-nickname', (data) => {
    socket.nickname = data['nickName'];
    socket.room = data['projectName'];
    socket.join(data['projectName']);
  
  });
  
  socket.on('add-message', (message) => {
    
    //io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
    //socket.broadcast.to(socket.room).emit('message', {text: message.text, from: socket.nickname, created: new Date()});
    io.sockets.in(socket.room).emit('message', {text: message.text, from: socket.nickname, created: new Date()});  
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});