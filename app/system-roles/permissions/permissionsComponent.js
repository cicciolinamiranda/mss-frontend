module.exports = function(ngModule) {
  ngModule.component('permissionsView', {
    template: require('permissions.html'),
    controller: require('./permissionsController')
  });
};
