module.exports = function(ngModule) {
  ngModule.component('roleView', {
    template: require(''),
    controller: require('./rolesController')
  });
};
