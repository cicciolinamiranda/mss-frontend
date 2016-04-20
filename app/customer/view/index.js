var angular = require('angular');
// require('angular-file-upload');
require('ui-select');
require('style!css!ui-select/dist/select.css');
require('angular-sanitize');
require('angular-messages');


var ngApp = angular.module('customerViewApp', [
  // 'angularFileUpload',
  'ngSanitize',
  'ui.select',
  'ngMessages',
  'eydis.gapi'
]);

require('./customerViewService')(ngApp);
require('./customerViewComponent')(ngApp);
require('../../contact/list/listService')(ngApp);
require('../../contact/list/listComponent')(ngApp);

module.exports = ngApp;
