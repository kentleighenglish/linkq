const { cloneDeep, reduce, findKey } = require('lodash');

const { QUEUE_TYPES } = require('../actions/queue');

const INITIAL_STATE = {
	loading: false,
	queue: {}
};

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {

	switch(action.type) {

		case QUEUE_TYPES.RECEIVE_QUEUE:
			state.queue = reduce(action.queue, (obj, item, key) => ({
				...obj,
				[key]: {
					...item,
					playing: false
				}
			}), {});
		break;
		case QUEUE_TYPES.PLAY_VIDEO:
			const prevId = findKey(state.queue, { playing: true});
			if (prevId) {
				state.queue[prevId].playing = false;
			}

			state.queue[action.videoId].playing = true;
		break;

	}

	return state;
}
