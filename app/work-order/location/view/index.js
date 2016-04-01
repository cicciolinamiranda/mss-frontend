var angular = require('angular');

var ngApp = angular.module('locationViewApp', [
]);

require('./viewLocationService')(ngApp);
require('./viewComponent')(ngApp);

module.exports = ngApp;
