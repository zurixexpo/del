const io = require('socket.io')({
	cors:{
		origin: ['http://localhost:3000']
	}
})

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

io.listen(process.env.PORT || 3000)