var angular = require('angular');

var ngApp = angular.module('auditlogsViewApp', [
]);

require('./viewComponent')(ngApp);

module.exports = ngApp;
