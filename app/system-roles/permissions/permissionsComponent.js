module.exports = function(ngModule) {
  ngModule.component('permissionsView', {
    template: require(''),
    controller: require('./permissionsController')
  });
};
