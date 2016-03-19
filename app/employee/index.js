var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('employeeApp', [
  'eydis.gapi',
  'ui.router'
]);

require('./config')(ngApp);
require('./routes')(ngApp);

require('./employeeModel')(ngApp);
require('./employeeRest')(ngApp);
require('./employeeService')(ngApp);

// app components
require('./list/listComponent')(ngApp);
require('./view/viewComponent')(ngApp);

module.exports = ngApp;
