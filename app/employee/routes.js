module.exports = function(ngModule) {
  ngModule.config(routes);
}

function routes($routeProvider, $locationProvider) {
  "ngInject";
  $routeProvider
    .when('/', {
      template: require('./index.html'),
      controller: 'EmployeeMainCtrl',
      controllerAs: 'vm'
    }).when('/viewEmployee/:id',{
      template: require('./view.html'),
      controller: 'ViewEmployeeCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(false);
}
