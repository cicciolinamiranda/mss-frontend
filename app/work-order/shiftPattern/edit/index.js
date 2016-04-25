var angular = require('angular');

var ngApp = angular.module('shiftPatternEditApp', [
]);

require('./editComponent')(ngApp);

module.exports = ngApp;
