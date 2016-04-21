module.exports = function(ngModule) {
  ngModule.component('auditlogsList', {
    template: require('./list.html'),
    controller: require('./listController'),
    bindings:{
      objectType:'='
    }
  });
};
