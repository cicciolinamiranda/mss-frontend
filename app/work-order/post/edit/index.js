var angular = require('angular');

var ngApp = angular.module('postEditApp', [
]);

require('./editService')(ngApp);
require('./editComponent')(ngApp);
require('./editModel')(ngApp);

module.exports = ngApp;
