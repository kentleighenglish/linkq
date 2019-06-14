const { prevVideo, nextVideo, setPlayerState, clearQueue } = require('shared/actions/queue');

require('./player-controls.scss');

class PlayerControlsComponent {

	constructor($scope, $ngRedux, socket) {
		this.socket = socket;
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ queue: { queue, playingIndex, playingVideo, playerState } }) {
		return {
			queue,
			playingIndex,
			playingVideo,
			playerState
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			prevVideo: () => dispatch(prevVideo()),
			nextVideo: () => dispatch(nextVideo()),
			clearQueue: () => dispatch(clearQueue()),
			setPlayerState: state => dispatch(setPlayerState(state))
		}
	}

	play() {
		this.setPlayerState('playing');
	}

	pause() {
		this.setPlayerState('paused');
	}
}

module.exports = {
	controller: [ '$scope', '$ngRedux', 'socket', PlayerControlsComponent ],
	controllerAs: 'ctrl',
	template: require('./player-controls.html').default
}
