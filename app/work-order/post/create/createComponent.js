module.exports = function(ngModule) {
  ngModule.component('postCreate', {
    template: require('./create.html'),
    controller: require('./createController')
  });
};
