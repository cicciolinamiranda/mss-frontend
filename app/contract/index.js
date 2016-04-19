var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('contractApp', [
  'eydis.gapi',
  'ui.router',
  // app components
  require('./list/index').name,
  require('./view/index').name,
  require('./create/index').name,
]);

require('./contractModel')(ngApp);
require('./config')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
