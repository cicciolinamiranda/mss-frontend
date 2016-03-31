var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('authApp', [
  'eydis.gapi',
  'ui.router'
]);

require('./config')(ngApp);
require('./routes')(ngApp);

require('./authProvider')(ngApp);
require('./loginComponent')(ngApp);

module.exports = ngApp;
