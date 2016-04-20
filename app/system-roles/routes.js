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
}
