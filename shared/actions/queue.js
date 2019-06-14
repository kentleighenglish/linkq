const { findKey } = require('lodash');

const QUEUE_TYPES = {
	RECEIVE_QUEUE: 'RECEIVE_QUEUE',
	PREV_VIDEO: 'PREV_VIDEO',
	NEXT_VIDEO: 'NEXT_VIDEO',
	UPDATE_PLAYER_STATE: 'UPDATE_PLAYER_STATE',
	SET_PLAYER_STATE: 'SET_PLAYER_STATE',
	CLEAR_QUEUE: 'CLEAR_QUEUE'
}

const receiveQueue = (queue) => ({
	type: QUEUE_TYPES.RECEIVE_QUEUE,
	queue
});

const prevVideo = () => (dispatch, getState) => {
	const { socket: { socket }, queue: { queue, playingIndex } } = getState();

	const prevIndex = playingIndex - 1;
	const prevId = findKey(queue, { index: prevIndex });

	if (prevId) {
		socket.emit('playVideo', prevId);
		dispatch({
			type: QUEUE_TYPES.PREV_VIDEO
		})
	}
}

const nextVideo = () => (dispatch, getState) => {
	const { socket: { socket }, queue: { queue, playingIndex } } = getState();

	const nextIndex = playingIndex + 1;
	const nextId = findKey(queue, { index: nextIndex });

	if (nextId) {
		socket.emit('playVideo', nextId);
		dispatch({
			type: QUEUE_TYPES.NEXT_VIDEO
		});
	} else {
		socket.emit('setPlayerState', 'stopped');
	}
}

const clearQueue = () => (dispatch, getState) => {
	const { socket: { socket } } = getState();

	socket.emit('clearQueue', {});

	dispatch({
		type: QUEUE_TYPES.CLEAR_QUEUE
	})
}

const setPlayerState = state => (dispatch, getState) => {
	const { socket: { socket } } = getState();
	socket.emit('setPlayerState', state);
	dispatch({
		type: QUEUE_TYPES.SET_PLAYER_STATE
	})
}

const updatePlayerState = state => ({
	type: QUEUE_TYPES.UPDATE_PLAYER_STATE,
	state
});


module.exports = {
	QUEUE_TYPES,
	receiveQueue,
	setPlayerState,
	updatePlayerState,
	clearQueue,
	prevVideo,
	nextVideo
}
