var angular = require('angular');

var ngApp = angular.module('customerSearchApp', [
]);

require('./searchService')(ngApp);
require('./searchComponent')(ngApp);

module.exports = ngApp;
