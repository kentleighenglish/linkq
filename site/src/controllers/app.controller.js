const { receiveQueue } = require('../actions/queue');

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
			receiveQueue: (queue) => dispatch(receiveQueue(queue))
		}
	}

	handleSocketIo() {
		this.socket.on('refreshQueue', (queue) => this.receiveQueue(queue));
	}

}

module.exports = [ '$scope', '$ngRedux', 'socket', AppController ];
