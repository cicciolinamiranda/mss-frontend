var angular = require('angular');
require('eydis-gapi');
require('angular-ui-router');
require('ui-select');
require('style!css!ui-select/dist/select.css');

var ngApp = angular.module('postApp', [
  'eydis.gapi',
  'ui.router',
  'ui.select',
  // app components
  require('./create/index').name,
  require('./edit/index').name,
  require('./view/index').name
]);

require('./postModel')(ngApp);
require('./postService')(ngApp);
require('./routes')(ngApp);

module.exports = ngApp;
