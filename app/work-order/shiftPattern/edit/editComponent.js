module.exports = function(ngModule) {
  ngModule.component('shiftPatternEditApp', {
    template: require('./edit.html'),
    controller: require('./editController')
  });
};
