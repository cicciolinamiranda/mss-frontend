module.exports = function(ngModule) {
  ngModule.component('contactCreate', {
    template: require('./create.html'),
    controller: require('./createController')
  });
};
