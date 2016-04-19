module.exports = function(ngModule) {
  ngModule.component('contractView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
