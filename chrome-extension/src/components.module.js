const { module } = require('angular');

const AppHeaderComponent = require('./components/app-header/app-header');

module('ComponentsModule', [])
.component('appHeader', AppHeaderComponent);
