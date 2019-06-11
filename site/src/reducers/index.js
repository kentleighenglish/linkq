const { combineReducers } = require('redux');

queue = require('./queue');
socket = require('./socket');

module.exports = combineReducers({
	queue,
	socket
});
