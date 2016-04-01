var angular = require('angular');

var ngApp = angular.module('globalSearchApp', [
]);

require('./globalSearchComponent')(ngApp);

module.exports = ngApp;
