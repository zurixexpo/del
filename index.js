const express = require('express');
const path = require('path');
const http = require('http');
var cors = require('cors');
const socketio = require('socket.io');
const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: `https://snale.netlify.app`,
        methods: ["GET", "POST"],
        credentials: true
      }
});



var users = {};

io.on('connection', socket =>{
	socket.on('message', name =>{
		console.log(name);
		users[socket.id] = name;
		console.log(JSON.stringify(users));
	socket.broadcast.emit('user-joined', {name: name, id: socket.id});
	});

	socket.on('boxindex', indexbx =>{
		socket.broadcast.emit('newindex', indexbx);
	});

	socket.on('disconnect', message =>{
		socket.broadcast.emit('left', users[socket.id]);
		delete users[socket.id]
	});
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
});
