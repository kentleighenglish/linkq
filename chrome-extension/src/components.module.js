const { module } = require('angular');

const AppHeaderComponent = require('shared/components/app-header/app-header');

module('ComponentsModule', [])
.component('appHeader', AppHeaderComponent);
