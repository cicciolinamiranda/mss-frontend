module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
  .state({
    name: 'shiftPattern',
    url: '/shiftPattern',
    abstract: true,
    template: '<ui-view/>'
  })
  .state({
    name: 'shiftPattern.view',
    url: '/view/:id',
    template: '<shift-pattern-view/>'
  })
  .state({
    name: 'shiftPattern.create',
    url: '/create',
    template: '<shift-pattern-create/>',
    params: {shiftPatternId: null}
  })
  .state({
    name: 'shiftPattern.edit',
    url: '/:transaction/:id',
    template: '<shift-pattern-edit/>',
    params: {shiftPatternId: null}
  });
}
