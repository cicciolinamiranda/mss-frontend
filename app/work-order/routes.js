module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider, $urlRouterProvider) {
  "ngInject";
  $stateProvider
    .state({
      name: 'location',
      url: '/locations',
      template: '<map-display/>'
    });
}
