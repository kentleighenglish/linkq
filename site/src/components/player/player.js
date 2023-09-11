const YTPlayer = require('yt-player');
const { findKey, find } = require('lodash');
const { nextVideo } = require('shared/actions/queue');
require('./player.scss');

class PlayerComponent {

	constructor($scope, $ngRedux, socket) {
		this.$scope = $scope;
		this.socket = socket;
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ queue: { queue, playingVideo, playingIndex, playerState } }) {
		console.log(playingVideo, playingIndex, playerState);
		return {
			queue,
			playingVideo,
			playingIndex,
			playerState
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			nextVideo: () => dispatch(nextVideo())
		}
	}

	$onInit() {
		this.videoContainer = document.getElementById('videoContainer');

		this.ytPlayer = new YTPlayer(this.videoContainer);

		// this.ytPlayer.mute();

		this.ytPlayer.on('ended', () => {
			this.nextVideo();
		});

		this.ytPlayer.on('cued', () => {
		});

		this.$scope.$watch(() => this.playingVideo, () => {
			if (this.playingVideo) {
				this.loadVideo(this.playingVideo);
			} else {
				this.unloadVideo();
			}
		});

		this.$scope.$watch(() => this.playerState, state => {
			switch(state) {
				case 'playing':
					this.ytPlayer.play();
				break;
				case 'paused':
					this.ytPlayer.pause();
				break;
			}
		});
	}

	loadVideo(id) {
		this.ytPlayer.load(id);
	}

	unloadVideo() {
		console.log(this.ytPlayer);
		this.ytPlayer.load();
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', 'socket', PlayerComponent ],
	controllerAs: 'ctrl',
	template: require('./player.html').default
}
