var angular = require('angular');
require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');
require('angular-messages');


var ngApp = angular.module('locationCreateApp', [
  'angularFileUpload',
  'ngSanitize',
  'ui.select',
  'ngMessages'
]);

require('./createService')(ngApp);
require('./createComponent')(ngApp);

module.exports = ngApp;
