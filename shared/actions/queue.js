const { findKey } = require('lodash');

const QUEUE_TYPES = {
	RECEIVE_QUEUE: 'RECEIVE_QUEUE'
}

const receiveQueue = (queue) => ({
	type: QUEUE_TYPES.RECEIVE_QUEUE,
	queue
});

prevVideo = (socket) => (dispatch, getState) => {
	const { queue: { queue, playingIndex } } = getState();

	const prevIndex = playingIndex - 1;
	const prevId = findKey(queue, { index: prevIndex });

	if (prevId) {
		socket.emit('playVideo', prevId);
	}
}

nextVideo = (socket) => (dispatch, getState) => {
	const { queue: { queue, playingIndex } } = getState();

	const nextIndex = playingIndex + 1;
	const nextId = findKey(queue, { index: nextIndex });

	if (nextId) {
		socket.emit('playVideo', nextId);
	}
}


module.exports = {
	QUEUE_TYPES,
	receiveQueue,
	prevVideo,
	nextVideo
}
