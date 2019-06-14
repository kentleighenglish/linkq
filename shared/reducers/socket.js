const { cloneDeep } = require('lodash');

const { SOCKET_TYPES } = require('shared/actions/socket');

const INITIAL_STATE = {
	connected: false,
	connecting: false,
	socket: null
}

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {

	switch(action.type) {
		case SOCKET_TYPES.SET_CONNECTING:
			state.connecting = action.connecting;
		break;
		case SOCKET_TYPES.SET_CONNECTED:
			state.connected = action.connected;
		break;
		case SOCKET_TYPES.SET_SOCKET:
			state.socket = action.socket;
		break;
	}

	return state;
}
