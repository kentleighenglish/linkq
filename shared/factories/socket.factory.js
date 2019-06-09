const io = require('socket.io-client');

module.exports = ($rootScope) => {
	const { socket: { host, path } } = config;

	const socket = io.connect(host, {
		path
	});

	return {
		on: (eventName, callback) => {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(() => callback.apply(socket, args));
			})
		},
		emit: (eventName, data, callback) => {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(() => {
					if (callback) {
						callback.apply(socket, args);
					}
				})
			})
		}
	}
}
