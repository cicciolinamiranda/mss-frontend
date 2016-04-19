var angular = require('angular');
var $script = require('scriptjs');

var reqLibs0 = [
  '//maps.googleapis.com/maps/api/js?libraries=places',
  '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'
];
var reqLibs = [
  '//apis.google.com/js/client.js?onload=_gapi_load_callback'
];
var devLibs = [
  '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
];

$script(reqLibs0, 'reqLibs0');

$script.ready('reqLibs0', function() {
  var ngApp = angular.module('mainApp', [
    // app modules
    require('./auth/index').name,
    require('./employee/index').name,
    require('./work-order/index').name,
    require('./customer/index').name,
    require('./contract/index').name,
    require('./contact/index').name,
    require('./search/index').name,

    // 3rd-party libs
    require('angular-ui-router')
  ]);

  require('./config')(ngApp);
  require('./routes')(ngApp);

  $script(reqLibs, 'reqLibs');

  $script.ready('reqLibs', function() {

    $script(devLibs, 'devLibs');

    angular.bootstrap(document, [ngApp.name]);
    ngApp.run(function($log) {
      $script.ready('devLibs', function() { $log.info('The application has been initialized.'); });
    });
  });
});
