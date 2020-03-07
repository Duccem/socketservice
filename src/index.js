const express = require('express');
const path = require('path');
const app = express();
const socketIO = require('socket.io');

app.set('port',process.argv[2] || process.env.PORT || 3000);
app.use('/',express.static(path.join(__dirname,'./public')));
const server = app.listen(app.get('port'), ()=>{
     console.log('server on port',app.get('port'));
});

const io = socketIO(server);

io.on('connection',(socket)=>{
     console.log('new connection');
     socket.on('new-message',(message) =>{
          console.log(message);
          io.emit("new-message",message);
     });
});