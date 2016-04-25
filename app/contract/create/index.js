var angular = require('angular');
// require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');
require('angular-messages');
require('ng-dialog');


var ngApp = angular.module('contractCreateApp', [
  // 'angularFileUpload',
  'ngSanitize',
  'ui.select',
  'ngMessages',
  'eydis.gapi',
  'ngDialog'
]);

require('./createService')(ngApp);
require('./createComponent')(ngApp);

module.exports = ngApp;
