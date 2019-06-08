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

if (process.env.NODE_ENV === 'development') {
	middleware = [
		...middleware,
		createLogger()
	];
}

// Create Redux reducers
const rootReducer = require('./reducers');
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

// Initialise App structure
module('app', [
	'AppModule',
	'ngRedux'
])
.config(($ngReduxProvider) => {
	$ngReduxProvider.provideStore(store);
})

bootstrap(document, [ 'app' ]);
