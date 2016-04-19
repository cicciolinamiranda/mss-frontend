var angular = require('angular');
// require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');
require('angular-messages');


var ngApp = angular.module('contractListApp', [
  // 'angularFileUpload',
  'ngSanitize',
  'ui.select',
  'ngMessages',
  'eydis.gapi'
]);

require('./listService')(ngApp);
require('./listComponent')(ngApp);

module.exports = ngApp;
