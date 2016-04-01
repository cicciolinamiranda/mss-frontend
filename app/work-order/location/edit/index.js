var angular = require('angular');
require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');


var ngApp = angular.module('locationEditApp', [
  'angularFileUpload',
  'ngSanitize',
  'ui.select'
]);

require('./editService')(ngApp);
require('./editComponent')(ngApp);

module.exports = ngApp;
