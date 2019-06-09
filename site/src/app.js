const { module, bootstrap } = require('angular');
const { createStore, applyMiddleware } = require('redux');
const { createLogger } = require('redux-logger');
const thunk = require('redux-thunk').default;

// Fetch SCSS core file
require('shared/scss/bootstrap.scss');

require('./app.module');
require('ng-redux');

var middleware = [
	thunk
];

if (ENV_MODE === 'development') {
	middleware = [
		...middleware,
		createLogger()
	];
}

// Create Redux reducers
const rootReducer = require('./reducers');
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

// Socket Factory
const SocketFactory = require('shared/factories/socket.factory');

// Initialise App structure
module('app', [
	'AppModule',
	'ngRedux'
])
.config(($ngReduxProvider) => {
	$ngReduxProvider.provideStore(store);
})
.factory('socket', SocketFactory)

bootstrap(document, [ 'app' ]);
