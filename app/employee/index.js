var angular = require('angular');
require('angular-route');
require('eydis-gapi');

var ngApp = angular.module('employeeApp', [
  'ngRoute',
  'eydis.gapi'
]);

require('./config')(ngApp);
require('./routes')(ngApp);
require('./employeeModel')(ngApp);
require('./restService')(ngApp);
require('./employeeService')(ngApp);
require('./listController')(ngApp);
require('./listComponent')(ngApp);
require('./mainController')(ngApp);

module.exports = ngApp;
