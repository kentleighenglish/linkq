const config = require('config');
const debug = require('debug')('linkq:socketlib');
const socketio = require('socket.io');
const { keyBy } = require('lodash');

const queuelib = require('./queuelib');

var queue = [];

var playerState = 'playing';

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

	hookEvents();

	updateAll();
}

const authenticate = ({ username, password }) => {
	debug('Authenticating socket...');
	if (username === config.socket.username && password === config.socket.password) {
		debug('Socket authenticated');
		return true;
	}

	debug('Socket not authenticated');
	return false;
}

const hookEvents = () => {
	io.on('connection', socket => {
		debug(`Received connection from ${socket.id}`);

		socket.on('authenticate', data => {
			const authed = authenticate(data);

			if (authed) {
				socket.join('authenticated');

				refresh(socket);

				socket.emit('updatePlayerState', playerState);

				socket.on('addToQueue', async (url) => {
					debug(`Adding ${url} to queue`);
					await queuelib.add(url, playerState);

					await updateAll();
				});

				socket.on('playVideo', async (videoId) => {
					debug(`Seting video: ${videoId} as playing`);

					await queuelib.setPlaying(videoId);
					await refresh(io);
				});

				socket.on('setPlayerState', (state) => {
					playerState = state === 'playing' ? 'playing' : 'paused';
					debug(`Updating player state to: ${playerState}`);
					io.to('authenticated').emit('updatePlayerState', playerState);
				});

				socket.on('clearQueue', async () => {
					await queuelib.clearQueue();

					await updateAll();
				});
			}
		});
	});
}

const updateAll = async () => {
	debug('Updating clients...');
	refresh(io.to('authenticated'));
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
