const YTPlayer = require('yt-player');
const { find } = require('lodash');
require('./player.scss');

class PlayerComponent {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;
		$ngRedux.connect(this.mapStateToThis)(this);
	}

	mapStateToThis({ queue }) {
		return {
			queue,
			playingVideo: find(queue.queue, { playing: true })
		}
	}

	$onInit() {
		this.videoContainer = document.getElementById('videoContainer');

		this.loadVideoPlayer();
	}

	loadVideoPlayer() {
		this.ytPlayer = new YTPlayer(this.videoContainer);

		if (this.playingVideo) {
			this.ytPlayer.load(this.playingVideo.videoId);
		}
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', PlayerComponent ],
	controllerAs: 'ctrl',
	template: require('./player.html').default
}
