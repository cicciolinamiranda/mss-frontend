var angular = require('angular');

var ngApp = angular.module('employeeLookupApp', [
]);

require('./employeeLookupService')(ngApp);
require('./employeeLookupComponent')(ngApp);

module.exports = ngApp;
