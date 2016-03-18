module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($urlRouterProvider) {
  "ngInject";
  // the default state referencing a module
  $urlRouterProvider.otherwise('/employees');
}
