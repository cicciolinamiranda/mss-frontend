var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router')

var ngApp = angular.module('systemRoleApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./permission/index').name
]);

require('./roleComponent')(ngApp);
require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
