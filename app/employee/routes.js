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
    })
    .otherwise({
      redirectTo: '/'
    });
}
