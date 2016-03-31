var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('payInfoViewApp', [
  'eydis.gapi',
  'ui.router'
]);

require('./payInfoService')(ngApp);
require('./payInfoComponent')(ngApp);

module.exports = ngApp;