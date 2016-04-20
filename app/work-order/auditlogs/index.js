var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('auditlogsApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./view/index').name,
  require('./list/index').name
]);
require('./auditlogsModel')(ngApp);
require('./auditlogsService')(ngApp);

module.exports = ngApp;
