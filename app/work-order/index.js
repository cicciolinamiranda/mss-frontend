var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('locationApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./location/map/index').name,
  require('./location/create/index').name,
  require('./location/employee-lookup/index').name,
  require('./location/view/index').name,
  require('./location/edit/index').name,
  require('./location/search/index').name,
  require('./post/index').name,
  require('./view/index').name,
  require('./auditlogs/index').name
]);
require('./location/locationModel')(ngApp);
require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
