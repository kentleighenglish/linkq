const { cloneDeep } = require('lodash');

const { QUEUE_TYPES } = require('../actions/queue');

const INITIAL_STATE = {
	loading: false,
	queue: {}
};

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {

	switch(action.type) {

		case QUEUE_TYPES.RECEIVE_QUEUE:
			state.queue = action.queue;
		break;

	}

	return state;
}
