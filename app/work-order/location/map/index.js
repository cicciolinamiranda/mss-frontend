var angular = require('angular');
require('eydis-gapi');
require('ngmap');

var ngApp = angular.module('mapModule', [
  'eydis.gapi',
  'ngMap'
]);

require('./mapComponent')(ngApp);

module.exports = ngApp;
