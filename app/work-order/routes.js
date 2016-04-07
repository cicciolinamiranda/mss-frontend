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
    name: 'post',
    url: '/posts',
    abstract: true,
    template: '<ui-view/>'
  })
  .state({
    name: 'post.view',
    url: '/view/:id',
    template: '<post-view/>'
  })
  .state({
    name: 'post.create',
    url: '/create',
    template: '<post-create/>'
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
  });
}
