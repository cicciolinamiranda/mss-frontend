var angular = require('angular');

var ngApp = angular.module('searchResultsApp', [
]);

require('./resultsComponent')(ngApp);

module.exports = ngApp;
