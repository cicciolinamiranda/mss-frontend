var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('employeeListApp', [
  'eydis.gapi'
]);

require('./listService')(ngApp);
require('./listComponent')(ngApp);

module.exports = ngApp;
