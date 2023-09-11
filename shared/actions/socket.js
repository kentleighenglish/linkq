
const SOCKET_TYPES = {
	SET_CONNECTING: 'SET_CONNECTING',
	SET_CONNECTED: 'SET_CONNECTED'
}

const setConnecting = (connecting) => ({
	type: SOCKET_TYPES.SET_CONNECTING,
	connecting
});

const setConnected = (connected) => ({
	type: SOCKET_TYPES.SET_CONNECTED,
	connected
});

module.exports = {
	SOCKET_TYPES,
	setConnecting,
	setConnected
}
