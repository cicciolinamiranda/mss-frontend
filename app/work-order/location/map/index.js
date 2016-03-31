var angular = require('angular');
require('eydis-gapi');
require('ngmap');
require('angular-messages');

var ngApp = angular.module('mapModule', [
  'eydis.gapi',
  'ngMap',
  'ngMessages'
]);

require('./mapComponent')(ngApp);

module.exports = ngApp;
