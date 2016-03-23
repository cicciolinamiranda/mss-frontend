module.exports = function(ngModule) {
  ngModule.component('mapDisplay', {
    template: require('./map.html'),
    controller: require('./mapController')
  });
};
