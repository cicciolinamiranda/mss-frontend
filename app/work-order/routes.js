module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
  .state({
    name: 'workOrder',
    url: '/workOrder/view/:id',
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
    params: { 'workOrderId': null }
  })
  .state({
    name: 'location.view',
    url: '/view',
    template: '<location-view/>'
  });
}
