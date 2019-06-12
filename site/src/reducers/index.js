const { combineReducers } = require('redux');

queue = require('shared/reducers/queue');
socket = require('shared/reducers/socket');

module.exports = combineReducers({
	queue,
	socket
});
