module.exports = function(ngModule) {
  ngModule.component('globalSearch', {
    template: require('./globalSearch.html'),
    controller: require('./globalSearchController')
  });
};
