module.exports = function(ngModule) {
  ngModule.component('roleView', {
    template: require('roles.html'),
    controller: require('./rolesController')
  });
};
