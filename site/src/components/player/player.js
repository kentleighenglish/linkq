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

	mapStateToThis({ queue: { queue, playingVideo, playingIndex } }) {
		return {
			queue,
			playingVideo,
			playingIndex
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			nextVideo: socket => dispatch(nextVideo(socket))
		}
	}

	$onInit() {
		this.videoContainer = document.getElementById('videoContainer');

		this.ytPlayer = new YTPlayer(this.videoContainer, {
			autoplay: true
		});

		this.ytPlayer.mute();

		this.ytPlayer.on('ended', () => {
			this.nextVideo(this.socket);
		});

		this.ytPlayer.on('cued', () => {
			this.ytPlayer.play();
		});

		this.$scope.$watch(() => this.playingVideo, () => {
			if (this.playingVideo) {
				this.loadVideo(this.playingVideo);
			}
		});
	}

	loadVideo(id) {
		this.ytPlayer.load(id);
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', 'socket', PlayerComponent ],
	controllerAs: 'ctrl',
	template: require('./player.html').default
}
