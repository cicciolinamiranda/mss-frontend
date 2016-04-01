var angular = require('angular');

var ngApp = angular.module('workOrderViewApp', [
]);

require('./viewComponent')(ngApp);

module.exports = ngApp;
