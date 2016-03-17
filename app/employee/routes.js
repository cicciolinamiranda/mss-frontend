module.exports = function(ngModule) {
  ngModule.config(routes);
}

routes.$inject = [
  '$routeProvider',
  '$locationProvider'
];

function routes($routeProvider, $locationProvider) {
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
