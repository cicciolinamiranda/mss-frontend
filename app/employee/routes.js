module.exports = function(ngModule) {
  ngModule.config(routes);
}

function routes($routeProvider, $locationProvider) {
  "ngInject";
  $routeProvider
    .when('/', {
      templateUrl: '/employee/list.html',
      controller: 'EmployeeListCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });
}
