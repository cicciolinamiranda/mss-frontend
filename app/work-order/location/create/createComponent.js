module.exports = function(ngModule) {
  ngModule.component('locationCreate', {
    template: require('./create.html'),
    controller: require('./createController')
  });
};
