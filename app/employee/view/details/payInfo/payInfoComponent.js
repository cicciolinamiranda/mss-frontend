module.exports = function(ngModule) {
  ngModule.component('payInfo', {
    template: require('./payInfo.html'),
    controller: require('./payInfoController'),
    bindings: {
      employeeId: '='
    }
  });
};