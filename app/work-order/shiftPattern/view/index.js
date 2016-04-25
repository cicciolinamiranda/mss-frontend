var angular = require('angular');

var ngApp = angular.module('shiftPatternViewApp', [
]);

require('./viewComponent')(ngApp);

module.exports = ngApp;
