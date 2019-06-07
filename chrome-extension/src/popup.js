import { module, bootstrap } from 'angular';
import './scss/bootstrap.scss';

import ComponentsModule from './components/components.module';

angular.module('app', [
	ComponentsModule
]);

bootstrap(document, [ 'app' ]);