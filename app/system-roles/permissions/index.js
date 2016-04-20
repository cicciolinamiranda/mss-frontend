var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('permissionsApp', [
  'eydis.gapi'
]);

require('./permissionsService')(ngApp);
require('./permissionsComponent')(ngApp);

module.exports = ngApp;
