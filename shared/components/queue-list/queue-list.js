require('./queue-list.scss');

class QueueListController {

	constructor($scope, $ngRedux) {

		$ngRedux.connect(this.mapStateToThis)(this);
		this.$scope = $scope;
	}

	mapStateToThis({ queue: { queue } }) {
		console.log(queue);
		return {
			queue
		}
	}

	playVideo(videoId) {
		this.onPlayVideo({ videoId: videoId });
	}
}

module.exports = {
	bindings: {
		onPlayVideo: '&'
	},
	bindToController: true,
	controller: [ '$scope', '$ngRedux', QueueListController ],
	controllerAs: 'ctrl',
	template: require('./queue-list.html').default
}
