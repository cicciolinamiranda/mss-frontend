var angular = require('angular');

var ngApp = angular.module('locationViewApp', [
]);

require('./viewComponent')(ngApp);

module.exports = ngApp;
