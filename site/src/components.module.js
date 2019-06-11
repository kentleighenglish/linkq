const { module } = require('angular');

const AppHeaderComponent = require('shared/components/app-header/app-header');
const QueueListComponent = require('shared/components/queue-list/queue-list');
const PlayerComponent = require('./components/player/player');

module('ComponentsModule', [])
.component('appHeader', AppHeaderComponent)
.component('queueList', QueueListComponent)
.component('player', PlayerComponent);
