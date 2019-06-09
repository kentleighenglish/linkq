const { cloneDeep } = require('lodash');

const INITIAL_STATE = {
	connected: false,
	connecting: false,
}

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {


	return state;
}
