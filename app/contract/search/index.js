var angular = require('angular');

var ngApp = angular.module('contractSearchApp', [
]);

require('./searchService')(ngApp);
require('./searchComponent')(ngApp);

module.exports = ngApp;
