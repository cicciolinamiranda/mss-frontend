var angular = require('angular');

var ngApp = angular.module('postCreateApp', [
]);

require('./createService')(ngApp);
require('./createComponent')(ngApp);

module.exports = ngApp;
