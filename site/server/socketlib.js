const config = require('config');
const debug = require('debug')('linkq:socketlib');
const socketio = require('socket.io')

const queuelib = require('./queuelib');

var queue = [];

var io;

const init = async (server) => {
	io = socketio(server, {
		path: config.socket.path
	});

	await hookEvents();

	await updateAll();
}

const hookEvents = async () => {
	io.on('connection', socket => {
		debug(`Received connection from ${socket.id}`);

		socket.emit('refreshQueue', queue);

		socket.on('addToQueue', async (url) => {
			debug(`Adding ${url} to queue`);
			await queuelib.add(url);

			await updateAll();
		});

		return;
	});
}

const updateAll = async () => {
	queue = await queuelib.refresh();

	debug('Updating clients...');
	io.emit('refreshQueue', queue);
	return;
}

module.exports = {
	init,
	hookEvents
}
