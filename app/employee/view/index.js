var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('employeeViewApp', [
  'eydis.gapi'
]);

require('./viewService')(ngApp);
require('./viewComponent')(ngApp);

module.exports = ngApp;
