var angular = require('angular');

var ngApp = angular.module('postViewApp', [
]);

require('./viewModel')(ngApp);
require('./viewService')(ngApp);
require('./viewComponent')(ngApp);

module.exports = ngApp;
