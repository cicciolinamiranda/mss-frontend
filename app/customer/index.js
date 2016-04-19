var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('customerApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./list/index').name,
  require('./view/index').name,
  require('../contact/list/index').name
]);

require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
