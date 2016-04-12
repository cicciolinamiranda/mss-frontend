var angular = require('angular');
require('ui-select');

var ngApp = angular.module('postCreateApp', [
    'ui.select'
]);

require('./createService')(ngApp);
require('./createComponent')(ngApp);

module.exports = ngApp;
