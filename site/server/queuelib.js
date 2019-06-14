// Data Store
const Datastore = require('nedb');
const db = new Datastore({ filename: './store/database.db', autoload: true });
const debug = require('debug')('linkq:queuelib');
const { gapi } = require('config');
const { youtube_v3: youtube } = require('googleapis');
const { findIndex } = require('lodash');

const yt = new youtube.Youtube({
	auth: gapi.key
});

const ytRegex = /.*(youtube.com\/watch\?v=|youtu.be\/)/;

const fetchYoutubeTitle = async (id) => {
	const { status, data: { items = [] } } = await yt.videos.list({ part: 'snippet', id });

	if (status === 200 && items.length) {
		return items[0].snippet.title;
	}

	return null;
}

const add = async (url, playerState) => {
	const videoId = url.replace(ytRegex, '');

	const title = await fetchYoutubeTitle(videoId);

	const queue = await fetchAll();

	const playing = findIndex(queue, { playing: true });

	await db.insert({
		index: queue.length,
		playing: (playerState === 'stopped' || (playerState === 'playing' && playing === -1)),
		videoId,
		title
	}, err => {
		if (!err) {
			return true;
		}
	});
}

const clearQueue = async () => {
	await db.remove({});

	return;
}

const fetchAll = () => {
	return new Promise((resolve, reject) => {
		db.find({})
		.sort({ index: 1 })
		.exec((err, result) => {
			if (result) {
				debug(`Queue has [${result.length}] items`);

				resolve(result);
			}
		});
	});
}

const setPlaying = async (videoId) => {
	await db.update({}, { $set: { playing: false } }, { multi: true });
	await db.update({ videoId }, { $set: { playing: true } });

	return true;
}

module.exports = {
	add,
	fetchAll,
	clearQueue,
	setPlaying
}
