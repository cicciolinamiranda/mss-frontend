var angular = require('angular');

var ngApp = angular.module('mainApp', [
  // app modules
  require('./employee/index').name,
  require('./work-order/index').name,

  // 3rd-party libs
  require('angular-ui-router')
]);

require('./routes')(ngApp);

angular.bootstrap(document, [ngApp.name]);
