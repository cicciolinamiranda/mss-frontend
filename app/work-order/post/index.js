var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('employeeApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./create/index').name,
  require('./edit/index').name,
  require('./view/index').name
]);

require('./postModel')(ngApp);
require('./postService')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
