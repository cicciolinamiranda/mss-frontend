module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'role',
      url: '/roles',
      abstract: true,
      template: '<role-view/>'
    })
    .state({
      name: 'permission',
      url: '/permissions',
      abstract: true,
      template: '<permissions-view/>'
    })
}
