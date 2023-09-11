
const SOCKET_TYPES = {
	SET_SOCKET: 'SET_SOCKET',
	SET_CONNECTING: 'SET_CONNECTING',
	SET_CONNECTED: 'SET_CONNECTED'
}

const setSocket = socket => ({
	type: SOCKET_TYPES.SET_SOCKET,
	socket
});

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
	setSocket,
	setConnecting,
	setConnected
}
