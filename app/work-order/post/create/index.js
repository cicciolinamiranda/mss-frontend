var angular = require('angular');

var ngApp = angular.module('postCreateApp', [
]);

require('./createComponent')(ngApp);

module.exports = ngApp;
