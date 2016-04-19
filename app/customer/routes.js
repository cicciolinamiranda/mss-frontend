module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'customer',
      url: '/customers',
      abstract: true,
      template: '<ui-view/>'
    })
    .state({
      name: 'customer.list',
      url: '',
      template: '<customer-list/>'
    })
    .state({
      name: 'customer.view',
      url: '/:customerNumber',
      template: '<customer-view/>'
    })
    .state({
      name: 'customer.search',
      url: '/search::searchTerm',
      template: '<customer-search/>'
    });
}
