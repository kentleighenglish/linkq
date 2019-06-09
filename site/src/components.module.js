const { module } = require('angular');

const AppHeader = require('shared/components/app-header/app-header');

module('ComponentsModule', [])
.component('appHeader', AppHeader);
