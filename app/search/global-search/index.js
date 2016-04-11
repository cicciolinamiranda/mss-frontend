var angular = require('angular');

var ngApp = angular.module('globalSearchApp', [
]);

require('./globalSearchService')(ngApp);
require('./globalSearchComponent')(ngApp);

module.exports = ngApp;
