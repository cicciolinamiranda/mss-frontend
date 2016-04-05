module.exports = function(ngModule) {
  ngModule.component('postView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
