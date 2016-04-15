module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
  .state({
    name: 'workOrder',
    url: '/workOrders/view/:id',
    template: '<work-order-view/>'
  })
  .state({
    name: 'location',
    url: '/locations',
    abstract: true,
    template: '<ui-view/>'
  })
  .state({
    name: 'location.create',
    url: '/create',
    template: '<location-create/>',
    params: {workOrderId: null}
  })
  .state({
    name: 'location.edit',
    url: '/edit/:id',
    template: '<location-edit/>'
  })
  .state({
    name: 'location.view',
    url: '/view/:id',
    template: '<location-view/>'
  })
  .state({
    name: 'location.search',
    url: '/search::searchTerm',
    template: '<location-search/>'
  });
}
