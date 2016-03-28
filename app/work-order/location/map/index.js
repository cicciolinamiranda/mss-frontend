var angular = require('angular');
require('eydis-gapi');
require('ngmap');

var ngApp = angular.module('commonLocationApp', [
  'eydis.gapi',
  'ngMap'
]);

require('./mapComponent')(ngApp);

module.exports = ngApp;
