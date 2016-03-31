var angular = require('angular');
require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');


var ngApp = angular.module('locationCreateApp', [
  'angularFileUpload',
  'ngSanitize',
  'ui.select'
]);

require('./createService')(ngApp);
require('./createComponent')(ngApp);

module.exports = ngApp;
