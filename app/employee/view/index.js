var angular = require('angular');
require('eydis-gapi');

var ngApp = angular.module('employeeViewApp', [
  'eydis.gapi',
  'ui.router',
  //view app components
	require('./details/payInfo/index').name
]);

require('./viewService')(ngApp);
require('./viewComponent')(ngApp);


module.exports = ngApp;
