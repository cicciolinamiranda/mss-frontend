module.exports = function(ngModule) {
  ngModule.component('postEdit', {
    template: require('./edit.html'),
    controller: require('./editController')
  });
};
