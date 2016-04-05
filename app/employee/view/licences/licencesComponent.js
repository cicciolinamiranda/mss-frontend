module.exports = function(ngModule) {
  ngModule.component('licencesView', {
    template: require('./licences.html'),
    controller: require('./licencesController'),
    bindings:{
      employee: '='
    }
  });
};