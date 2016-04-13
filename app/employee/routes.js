module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'employee',
      url: '/employees',
      abstract: true,
      template: '<ui-view/>'
    })
    .state({
      name: 'employee.list',
      url: '',
      template: '<employee-list/>'
    })
    .state({
      name: 'employee.search',
      url: '/search::searchTerm',
      template: '<employee-list/>'
    })
    .state({
      name: 'employee.view',
      url: '/:employeeId',
      template: '<employee-view/>'
    });
}
