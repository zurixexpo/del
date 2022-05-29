const socket = io('https://snake-testapp.herokuapp.com/');

const form = document.getElementById('my-form');
const input = document.getElementById('myinp');
const container = document.getElementById('container');

const name = prompt("enter your name");
socket.emit('message', name);


socket.on('user-joined', data =>{
	console.log('name' + data.name);
	let div = document.createElement('div');
	div.classList.add('msg');
	div.innerHTML = `${data.name} joined the chat with ${data.id}`;
	container.appendChild(div);
});

socket.on('left', message =>{
	let div = document.createElement('div');
	div.classList.add('msg');
	div.innerHTML = `${message} left the chat`;
	container.appendChild(div);
});

let boxes = document.querySelectorAll('.boxes');

for (var i = 0; i < boxes.length; i++) {
	boxes[i].onclick = function (){
		console.log(this.title)
		this.style.backgroundColor = 'black';
		socket.emit('boxindex', this.title);
	}
}

socket.on('newindex', index =>{
	boxes[index].style.backgroundColor = 'black';
	console.log(index)
});
