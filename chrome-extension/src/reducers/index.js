const { combineReducers } = require('redux');

const queue = require('shared/reducers/queue');
const socket = require('shared/reducers/socket');

module.exports = combineReducers({
	queue,
	socket
});
