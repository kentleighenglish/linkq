const { receiveQueue, updatePlayerState } = require('shared/actions/queue');
const { setConnecting, setConnected, setSocket } = require('shared/actions/socket');

class AppController {

	constructor($scope, $ngRedux, socket) {

		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);

		this.socket = socket;
	}

	$onInit() {
		this.handleSocketIo();
	}

	mapStateToThis({ queue }) {
		return {
			queue: queue.queue,
			queueCount: Object.keys(queue.queue).length
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			receiveQueue: queue => dispatch(receiveQueue(queue)),
			setSocket: socket => dispatch(setSocket(socket)),
			setConnecting: connecting => dispatch(setConnecting(connecting)),
			setConnected: connected => dispatch(setConnected(connected)),
			updatePlayerState: state => dispatch(updatePlayerState(state))
		}
	}

	handleSocketIo() {
		this.setSocket(this.socket);

		this.socket.on('refreshQueue', (queue) => this.receiveQueue(queue));
		this.socket.on('updatePlayerState', state => this.updatePlayerState(state));

		this.socket.on('connect', () => {
			this.setConnecting(false);
			this.setConnected(true);
		})

		this.socket.on('reconnect', () => {
			this.setConnecting(true);
			this.setConnected(false);
		})
		this.socket.on('reconnecting', () => {
			this.setConnecting(true);
			this.setConnected(false);
		})

		this.socket.on('disconnect', () => {
			this.setConnected(false);
		})
	}

	playVideo(videoId) {
		this.socket.emit('playVideo', videoId);
	}

}

module.exports = [ '$scope', '$ngRedux', 'socket', AppController ];
