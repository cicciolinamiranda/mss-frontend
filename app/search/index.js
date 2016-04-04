var angular = require('angular');
require('angular-ui-router');
require('eydis-gapi');

var ngApp = angular.module('searchApp', [
  'ui.router',
  'eydis.gapi',
  require('./global-search/index').name,
  require('./results/index').name
]);

require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
