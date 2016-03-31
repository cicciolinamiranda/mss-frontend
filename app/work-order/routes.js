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
    template: '<location-create/>'
  })
  .state({
    name: 'location.edit',
    url: '/edit',
    template: '<location-edit/>'
  })
  .state({
    name: 'location.view',
    url: '/view',
    template: '<location-view/>'
  });
}
