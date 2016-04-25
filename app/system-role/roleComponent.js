module.exports = function(ngModule) {
  ngModule.component('roleList', {
    template: require('role.html'),
    controller: require('./roleController')
  });
};
