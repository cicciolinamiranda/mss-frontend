var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('commonLocationApp', [
  'eydis.gapi'
]);

require('./mapComponent')(ngApp);

module.exports = ngApp;
