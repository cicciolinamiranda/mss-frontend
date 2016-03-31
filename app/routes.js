module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($urlRouterProvider) {
  // the default state referencing a module
  $urlRouterProvider.otherwise('/employees');
}
