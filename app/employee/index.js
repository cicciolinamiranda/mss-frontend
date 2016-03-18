var angular = require('angular');
require('angular-route');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('employeeApp', [
  'ngRoute',
  'eydis.gapi',
  'ui.router'
]);

require('./config')(ngApp);
require('./routes')(ngApp);
require('./employeeModel')(ngApp);
require('./employeeRest')(ngApp);
require('./employeeService')(ngApp);
require('./listController')(ngApp);
require('./listComponent')(ngApp);
require('./viewController')(ngApp);
require('./viewComponent')(ngApp);

module.exports = ngApp;
