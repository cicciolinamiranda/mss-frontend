module.exports = function(ngModule) {
  ngModule.component('roleView', {
    template: require('permission.html'),
    controller: require('./permissionController')
  });
};
