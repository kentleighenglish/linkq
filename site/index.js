const express = require('express')
const app = express();
const path = require('path');
const config = require('config');

const server = require('http').Server(app);
const io = require('socket.io')(server, {
	path: config.socket.path
});

// Link Queue
const queue = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
	response.sendFile(path.resolve('index.html'));
});


// Socket Handling
io.on('connection', socket => {
	console.log(`Received connection from ${socket.id}`);

	socket.emit('receiveQueue', queue);

	socket.on('addToQueue', url => {
		console.log(`Queue has [${queue.length}] items`);
		queue.push(url);

		console.log('Updating clients...');
		io.emit('receiveQueue', queue);
	});
});

server.listen(3200);
console.log('Listening on port 3200');
