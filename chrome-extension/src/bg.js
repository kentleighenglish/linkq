const socket = require('socket.io-client');

// const hasYoutubeLink = {
//     conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//             css: [ '*[href*="youtube.com"], *[href*="youtu.be"]' ]
//         })
//     ],
//     actions: [ new chrome.declarativeContent.ShowPageAction() ]
// };

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

	chrome.contextMenus.onClicked.addListener(({ linkUrl }) => {

	});
});
