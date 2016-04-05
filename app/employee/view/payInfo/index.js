var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('payInfoViewApp', [
  'eydis.gapi'
]);

require('./payInfoService')(ngApp);
require('./payInfoComponent')(ngApp);

module.exports = ngApp;