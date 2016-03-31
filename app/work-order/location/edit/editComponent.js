module.exports = function(ngModule) {
  ngModule.component('locationEdit', {
    template: require('./edit.html'),
    controller: require('./editController')
  });
};
