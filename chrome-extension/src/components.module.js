const { module } = require('angular');

const AppHeaderComponent = require('shared/components/app-header/app-header');
const PlayerControlsComponent = require('shared/components/player-controls/player-controls');
const QueueListComponent = require('shared/components/queue-list/queue-list');

module('ComponentsModule', [])
.component('appHeader', AppHeaderComponent)
.component('playerControls', PlayerControlsComponent)
.component('queueList', QueueListComponent);
