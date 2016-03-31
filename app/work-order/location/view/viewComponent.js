module.exports = function(ngModule) {
  ngModule.component('locationView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
