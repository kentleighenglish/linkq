const { receiveQueue } = require('../actions/queue');
const { setConnecting, setConnected } = require('../actions/socket');

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
			queue: queue.queue
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			receiveQueue: queue => dispatch(receiveQueue(queue)),
			setConnecting: connecting => dispatch(setConnecting(connecting)),
			setConnected: connected => dispatch(setConnected(connected))
		}
	}

	handleSocketIo() {
		this.socket.on('refreshQueue', (queue) => this.receiveQueue(queue));

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

}

module.exports = [ '$scope', '$ngRedux', 'socket', AppController ];
