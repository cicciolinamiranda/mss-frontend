var angular = require('angular');

var ngApp = angular.module('mainApp', [
  require('./employee/index').name
]);

require('./routes')(ngApp);

angular.bootstrap(document, [ngApp.name]);
