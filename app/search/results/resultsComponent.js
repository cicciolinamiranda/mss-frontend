module.exports = function(ngModule) {
  ngModule.component('searchResults', {
    template: require('./results.html'),
    controller: require('./resultsController')
  });
};
