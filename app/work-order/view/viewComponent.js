module.exports = function(ngModule) {
  ngModule.component('workOrderView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
