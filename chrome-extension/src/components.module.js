const { module } = require('angular');

const AppHeaderComponent = require('shared/components/app-header/app-header');
const QueueListComponent = require('shared/components/queue-list/queue-list');

module('ComponentsModule', [])
.component('appHeader', AppHeaderComponent)
.component('queueList', QueueListComponent);
