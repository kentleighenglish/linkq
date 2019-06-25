require('babel-polyfill');
const io = require('socket.io-client');

const { socket: socketConfig } = config;
let socket;

const connectToSocket = async () => {
	socket = io.connect(socketConfig.host, {
		path: socketConfig.path
	});

	const { username, password } = socketConfig;

	socket.once('connect', () => {
		socket.emit('authenticate', { username, password });

		console.log('Connected to Socket Server');
		socket.on('refreshQueue', (queue) => {
			console.log('Received queue');
			let count = '0';
			if (queue) {
				const keys = Object.keys(queue);

				count = `${keys.length}`;
			}

			chrome.browserAction.setBadgeText({ text: count });
		});

		return socket;
	});
}

chrome.contextMenus.onClicked.addListener(async ({ linkUrl }) => {
	console.log('Attempting to add link to queue');
	if (!socket) {
		await connectToSocket();
	}

	console.log('Add To Queue');
	socket.emit('addToQueue', linkUrl);
});

chrome.runtime.onInstalled.addListener((details) => {

	chrome.contextMenus.removeAll(() => {
		chrome.contextMenus.create({
			id: 'add-yt-link',
			type: 'normal',
			contexts: [ 'link' ],
			title: 'Add to LinkQ',
			targetUrlPatterns: [ '*://youtube.com/watch*', '*://www.youtube.com/watch*', '*://youtu.be/*', '*://www.youtu.be/*' ]
		})
	});
});

chrome.runtime.onSuspend.addListener(() => {
	socket.disconnect();

	socket = null;
});

chrome.runtime.onStartup.addListener(async () => {
	if (!socket) {
		await connectToSocket();
	}
});
