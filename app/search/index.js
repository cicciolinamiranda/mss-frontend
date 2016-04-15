var angular = require('angular');
require('angular-ui-router');
require('eydis-gapi');

var ngApp = angular.module('searchApp', [
  'ui.router',
  'eydis.gapi',
  require('./global-search/index').name
]);

module.exports = ngApp;
