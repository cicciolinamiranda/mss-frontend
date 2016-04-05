var angular = require('angular');

var ngApp = angular.module('mainApp', [
  // app modules
  require('./auth/index').name,
  require('./employee/index').name,
  require('./work-order/index').name,
  require('./search/index').name,

  // 3rd-party libs
  require('angular-ui-router')
]);

require('./config')(ngApp);
require('./routes')(ngApp);

angular.bootstrap(document, [ngApp.name]);
