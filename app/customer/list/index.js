var angular = require('angular');
// require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');
require('angular-messages');


var ngApp = angular.module('customerListApp', [
  // 'angularFileUpload',
  'ngSanitize',
  'ui.select',
  'ngMessages',
  'eydis.gapi'
]);

require('./customerListService')(ngApp);
require('./customerListComponent')(ngApp);

module.exports = ngApp;
