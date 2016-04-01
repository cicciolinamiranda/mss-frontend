var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('searchApp', [
  'ui.router',
  require('./global-search/index').name,
  require('./results/index').name
]);

require('./routes')(ngApp);

module.exports = ngApp;
