var angular = require('angular');

var ngApp = angular.module('reasonForChangeApp', []);

require('./reasonForChangeComponent')(ngApp);

module.exports = ngApp;
