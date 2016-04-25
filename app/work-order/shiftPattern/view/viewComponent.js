module.exports = function(ngModule) {
  ngModule.component('shiftPatternView', {
    template: require('./view.html'),
    controller: require('./viewController')
  });
};
