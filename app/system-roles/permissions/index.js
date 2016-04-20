var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('permissionApp', [
  'eydis.gapi'
]);

// require('./permissionService')(ngApp);
// require('./permissionComponent')(ngApp);

module.exports = ngApp;
