const { module } = require('angular');

const AppHeader = require('shared/components/app-header/app-header');
const QueueList = require('shared/components/queue-list/queue-list');

module('ComponentsModule', [])
.component('appHeader', AppHeader)
.component('queueList', QueueList);
