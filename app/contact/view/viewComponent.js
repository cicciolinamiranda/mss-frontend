module.exports = function(ngModule) {
  ngModule.component('contactView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
