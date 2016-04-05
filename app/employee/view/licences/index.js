var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('licencesViewApp', [
  'eydis.gapi'
]);

require('./licencesService')(ngApp);
require('./licencesComponent')(ngApp);

module.exports = ngApp;