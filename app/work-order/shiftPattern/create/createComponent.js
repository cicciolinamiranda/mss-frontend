module.exports = function(ngModule) {
  ngModule.component('shiftPatternCreate', {
    template: require('./create.html'),
    controller: require('./createController')
  });
};
