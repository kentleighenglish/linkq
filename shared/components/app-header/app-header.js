require('./app-header.scss');

class AppHeaderComponent {

	constructor($scope) {
	}

	$onInit() {
	}
}

module.exports = {
	controller: [ '$scope', AppHeaderComponent],
	controllerAs: 'vm',
	template: require('./app-header.html').default
};
