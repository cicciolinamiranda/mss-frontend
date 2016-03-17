module.exports = function(ngModule) {
  ngModule.config(routes);
}

function routes($routeProvider, $locationProvider) {
  "ngInject";
  $routeProvider
    .when('/', {
      template: require('./list.html'),
      controller: 'EmployeeListCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });
}
