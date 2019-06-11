const io = require('socket.io-client');
// const hasYoutubeLink = {
//     conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//             css: [ '*[href*="youtube.com"], *[href*="youtu.be"]' ]
//         })
//     ],
//     actions: [ new chrome.declarativeContent.ShowPageAction() ]
// };

const { socket: socketConfig } = config;

chrome.contextMenus.onClicked.addListener(({ linkUrl }) => {
	console.log('Attempting to add link to queue');
	const socket = io.connect(socketConfig.host, {
		path: socketConfig.path
	});

	socket.once('connect', () => {
		console.log('Connected to Socket Server');

		console.log('Add To Queue');
		console.log(socket);
		socket.emit('addToQueue', linkUrl);

		socket.disconnect();
	});
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
