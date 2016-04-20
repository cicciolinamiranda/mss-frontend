var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router')

var ngApp = angular.module('systemRolesApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./permissions/index').name
]);

require('./rolesComponent')(ngApp);
require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
