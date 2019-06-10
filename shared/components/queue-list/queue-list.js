require('./queue-list.scss');

class QueueListController {

	constructor($scope, $ngRedux) {

		$ngRedux.connect(this.mapStateToThis)(this);
	}

	mapStateToThis({ queue: { queue } }) {
		return {
			queue
		}
	}
}

module.exports = {
	controller: [ '$scope', '$ngRedux', QueueListController ],
	controllerAs: 'ctrl',
	template: require('./queue-list.html').default
}
