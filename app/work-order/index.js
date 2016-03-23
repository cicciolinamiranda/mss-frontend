var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('locationApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./location/common/index').name
]);

require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
