module.exports = function(ngModule) {
  ngModule.component('contractCreate', {
    template: require('./create.html'),
    controller: require('./createController')
  });
};
