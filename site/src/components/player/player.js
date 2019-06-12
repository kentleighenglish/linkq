const YTPlayer = require('yt-player');
const { findKey, find } = require('lodash');
require('./player.scss');

class PlayerComponent {

	constructor($scope, $ngRedux, socket) {
		this.$scope = $scope;
		this.socket = socket;
		$ngRedux.connect(this.mapStateToThis)(this);
	}

	mapStateToThis({ queue: { queue } }) {
		return {
			queue,
			playingVideo: findKey(queue, { playing: true })
		}
	}

	$onInit() {
		this.videoContainer = document.getElementById('videoContainer');

		this.ytPlayer = new YTPlayer(this.videoContainer, {
			autoplay: true
		});

		this.ytPlayer.on('ended', () => {
			this.nextVideo();
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

	nextVideo() {
		const currentVid = this.queue[this.playingVideo];
		const nextIndex = currentVid.index + 1;

		const nextId = findKey(this.queue, { index: nextIndex });

		if (nextId) {
			this.socket.emit('playVideo', nextId);
		}
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', 'socket', PlayerComponent ],
	controllerAs: 'ctrl',
	template: require('./player.html').default
}
