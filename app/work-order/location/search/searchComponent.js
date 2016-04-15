module.exports = function(ngModule) {
  ngModule.component('locationSearch', {
    template: require('./search.html'),
    controller: require('./searchController')
  });
};
