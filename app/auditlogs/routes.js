module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
  .state({
    name: 'auditlogs',
    url: '/auditlogs',
    abstract: true,
    template: '<ui-view/>'
  })
  .state({
    name: 'auditlogs.list',
    url: '/list',
    template: '<auditlogs-list/>'
  })
  .state({
    name: 'auditlogs.view',
    url: '/view/:revisionNumber',
    template: '<auditlogs-view/>'
  });
}
