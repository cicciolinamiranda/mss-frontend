var angular = require('angular');
require('angular-route');

var ngApp = angular.module('app', [
  'ngRoute'
]);

require('./routes')(ngApp);
require('./restService')(ngApp);
require('./listController')(ngApp);

module.exports = ngApp;
