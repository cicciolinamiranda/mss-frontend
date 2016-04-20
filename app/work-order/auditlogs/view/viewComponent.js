module.exports = function(ngModule) {
  ngModule.component('auditlogsView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
