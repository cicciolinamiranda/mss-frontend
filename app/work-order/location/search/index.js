var angular = require('angular');

var ngApp = angular.module('locationSearchApp', [
]);

require('./searchService')(ngApp);
require('./searchComponent')(ngApp);

module.exports = ngApp;
