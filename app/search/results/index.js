var angular = require('angular');

var ngApp = angular.module('searchResultsApp', [
]);

require('./resultsService')(ngApp);
require('./resultsComponent')(ngApp);

module.exports = ngApp;
