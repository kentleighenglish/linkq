const { cloneDeep, findIndex, findKey } = require('lodash');

const { QUEUE_TYPES } = require('shared/actions/queue');

const INITIAL_STATE = {
	loading: false,
	queue: {},
	playingIndex: null,
	playingVideo: null,
	playerState: 'playing'
};

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {

	switch(action.type) {

		case QUEUE_TYPES.RECEIVE_QUEUE:
			state.queue = action.queue;
			state.playingVideo = findKey(state.queue, { playing: true });
			state.playingIndex = state.playingVideo ? state.queue[state.playingVideo].index : null;
		break;
		case QUEUE_TYPES.UPDATE_PLAYER_STATE:
			state.playerState = action.state;
		break;
	}

	return state;
}
