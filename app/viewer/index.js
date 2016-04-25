var angular = require('angular');
require('angular-ui-router');
require('eydis-gapi');

var ngApp = angular.module('viewerApp', [
  'ui.router',
  'eydis.gapi',
  require('./file-viewer/index').name
]);

module.exports = ngApp;
