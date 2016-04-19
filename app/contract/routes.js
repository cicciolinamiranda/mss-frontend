module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'contract',
      url: '/contracts',
      abstract: true,
      template: '<ui-view/>'
    })
    .state({
      name: 'contract.create',
      url: '/create/:accountNumber/:customerId/:customerNumber',
      template: '<contract-create/>'
    })
    .state({
      name: 'contract.list',
      url: '',
      template: '<contract-list/>'
    })
    .state({
      name: 'contract.view',
      url: '/view/:contractNumber',
      template: '<contract-view/>'
    });
}
