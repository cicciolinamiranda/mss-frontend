var angular = require('angular');

var ngApp = angular.module('fileViewerApp', [
  'ngDialog'
]);

require('./fileViewerComponent')(ngApp);

module.exports = ngApp;
