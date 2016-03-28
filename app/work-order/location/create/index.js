var angular = require('angular');

var ngApp = angular.module('locationCreateApp', [
]);

require('./createComponent')(ngApp);

module.exports = ngApp;
