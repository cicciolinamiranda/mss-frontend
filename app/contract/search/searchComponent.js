module.exports = function(ngModule) {
  ngModule.component('contractSearch', {
    template: require('./search.html'),
    controller: require('./searchController')
  });
};
