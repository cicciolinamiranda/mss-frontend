var angular = require('angular');

var ngApp = angular.module('auditlogsListApp', [
]);

require('./listComponent')(ngApp);

module.exports = ngApp;
