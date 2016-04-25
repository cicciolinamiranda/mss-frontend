var angular = require('angular');

var ngApp = angular.module('shiftPatternCreateApp', []);

require('./createComponent')(ngApp);

module.exports = ngApp;
