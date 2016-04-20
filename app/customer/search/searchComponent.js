module.exports = function(ngModule) {
  ngModule.component('customerSearch', {
    template: require('./search.html'),
    controller: require('./searchController')
  });
};
