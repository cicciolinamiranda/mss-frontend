var angular = require('angular');
// require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');
require('angular-messages');


var ngApp = angular.module('contactViewApp', [
  // 'angularFileUpload',
  'ngSanitize',
  'ui.select',
  'ngMessages',
  'eydis.gapi'
]);

require('./viewService')(ngApp);
require('./viewComponent')(ngApp);

module.exports = ngApp;
