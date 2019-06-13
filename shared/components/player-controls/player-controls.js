const { prevVideo, nextVideo } = require('shared/actions/queue');

require('./player-controls.scss');

class PlayerControlsComponent {

	constructor($scope, $ngRedux, socket) {
		this.socket = socket;
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ queue: { queue, playingIndex, playingVideo } }) {
		return {
			queue,
			playingIndex,
			playingVideo
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			prevVideo: socket => dispatch(prevVideo(socket)),
			nextVideo: socket => dispatch(nextVideo(socket))
		}
	}

	prev() {
		this.prevVideo(this.socket);
	}

	next() {
		this.nextVideo(this.socket);
	}
}

module.exports = {
	controller: [ '$scope', '$ngRedux', 'socket', PlayerControlsComponent ],
	controllerAs: 'ctrl',
	template: require('./player-controls.html').default
}
