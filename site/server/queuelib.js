// Data Store
const Datastore = require('nedb');
const db = new Datastore({ filename: './store/database.db', autoload: true });
const debug = require('debug')('linkq:queuelib');

var queue = [];

const ytRegex = /.*(youtube.com\/watch\?v=|youtu.be\/)/;

const add = async (url) => {
	db.insert({
		index: queue.length,
		playing: false,
		videoId: url.replace(ytRegex, '')
	}, err => {
		if (!err) {
			return true;
		}
	});
}

const refresh = () => {
	return new Promise((resolve, reject) => {
		db.find({}, (err, result) => {

			if (result) {
				debug(`Queue has [${result.length}] items`);

				resolve(result);
			}
		});
	});
}

module.exports = {
	add,
	refresh
}
