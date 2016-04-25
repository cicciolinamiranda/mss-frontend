var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('shiftPatternApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./create/index').name,
  require('./edit/index').name,
  require('./view/index').name
]);

require('./shiftPatternModel')(ngApp);
require('./shiftPatternService')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
