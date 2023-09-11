const { cloneDeep, findIndex, findKey } = require('lodash');

const { QUEUE_TYPES } = require('shared/actions/queue');

const INITIAL_STATE = {
	loading: false,
	queue: {},
	playingIndex: null,
	playingVideo: null
};

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {

	switch(action.type) {

		case QUEUE_TYPES.RECEIVE_QUEUE:
			state.queue = action.queue;
			state.playingVideo = findKey(state.queue, { playing: true });
			state.playingIndex = state.queue[state.playingVideo].index;
		break;

	}

	return state;
}
