require('./app-header.scss');

class AppHeaderComponent {

	constructor($scope) {
		console.log('init 1');
	}

	$onInit() {
		console.log('init');
	}
}

module.exports = {
	controller: [ '$scope', AppHeaderComponent],
	controllerAs: 'vm',
	template: require('./app-header.html').default
};
