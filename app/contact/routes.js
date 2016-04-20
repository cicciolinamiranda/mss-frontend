module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'contact',
      url: '/contacts',
      abstract: true,
      template: '<ui-view/>'
    })
    .state({
      name: 'contact.create',
      url: '/create/:accountNumber/:id/:customerNumber',
      template: '<contact-create/>'
    })
    .state({
      name: 'contact.list',
      url: '',
      template: '<contact-list/>'
    })
    .state({
      name: 'contact.view',
      url: '/view/:contactId',
      template: '<contact-view/>'
    });
}
