module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'search',
      url: '/search?q&objectType',
      template: '<search-results/>'
    });
}
