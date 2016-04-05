var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('attributesViewApp', [
  'eydis.gapi'
]);

require('./attributesService')(ngApp);
require('./attributesComponent')(ngApp);

module.exports = ngApp;
