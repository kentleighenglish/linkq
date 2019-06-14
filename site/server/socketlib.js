const config = require('config');
const debug = require('debug')('linkq:socketlib');
const socketio = require('socket.io')
const { keyBy } = require('lodash');

const queuelib = require('./queuelib');

var queue = [];

var io;

const init = async (server) => {
	io = socketio(server, {
		path: config.socket.path,
		serveClient: false,
		pingInterval: 10000,
		pingTimeout: 5000,
		cookie: false,
		wsEngine: 'ws'
	});

	await hookEvents();

	await updateAll();
}

const hookEvents = async () => {
	io.on('connection', socket => {
		debug(`Received connection from ${socket.id}`);

		refresh(socket);

		socket.on('addToQueue', async (url) => {
			debug(`Adding ${url} to queue`);
			await queuelib.add(url);

			await updateAll();
		});

		socket.on('playVideo', async (videoId) => {
			debug(`Seting video: ${videoId} as playing`);

			await queuelib.setPlaying(videoId);
			await refresh(io);
		});

		return;
	});
}

const updateAll = async () => {
	debug('Updating clients...');
	refresh(io);
	return;
}

const refresh = async (sock) => {
	queue = await queuelib.fetchAll();

	sock.emit('refreshQueue', keyBy(queue, 'videoId'));
}

module.exports = {
	init,
	hookEvents
}
