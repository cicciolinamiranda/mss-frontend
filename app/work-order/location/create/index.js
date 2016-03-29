var angular = require('angular');
require('angular-file-upload');

var ngApp = angular.module('locationCreateApp', [
  'angularFileUpload'
]);

require('./createComponent')(ngApp);

module.exports = ngApp;
