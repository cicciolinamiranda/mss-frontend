module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
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
    template: '<post-create/>',
    params: {locationId: null}
  });
}
