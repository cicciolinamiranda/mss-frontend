module.exports = function(ngModule) {
  ngModule.component('reasonForChange', {
    template: require('./reasonForChange.html'),
    controller: require('./reasonForChangeController'),
    bindings: {
      toBeSaved: '=',
      saveOrUpdate: '=',
      objectType:'='
    }
  });
};
