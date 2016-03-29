module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  "ngInject";
  $stateProvider
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
    });
}
