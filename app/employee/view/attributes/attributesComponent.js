module.exports = function(ngModule) {
  ngModule.component('attributesView', {
    template: require('./attributes.html'),
    controller: require('./attributesController'),
    bindings:{
      employee: '='
    }
  });
};