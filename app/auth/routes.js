module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'auth',
      url: '/start',
      abstract: true,
      template: '<ui-view/>'
    })
    .state({
      name: 'auth.login',
      url: '',
      template: '<login-form/>'
    }).state({
      name: 'auth.error',
      url: '/authError',
      template: require('./authError.html')
    });
}
