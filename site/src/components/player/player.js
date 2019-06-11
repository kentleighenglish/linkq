const YTPlayer = require('yt-player');
const { findKey } = require('lodash');
require('./player.scss');

class PlayerComponent {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;
		$ngRedux.connect(this.mapStateToThis)(this);
	}

	mapStateToThis({ queue }) {
		return {
			queue,
			playingVideo: findKey(queue.queue, { playing: true })
		}
	}

	$onInit() {
		this.videoContainer = document.getElementById('videoContainer');

		this.ytPlayer = new YTPlayer(this.videoContainer);

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
	controller: [ '$scope', '$ngRedux', PlayerComponent ],
	controllerAs: 'ctrl',
	template: require('./player.html').default
}
