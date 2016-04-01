module.exports = function(ngModule) {
  ngModule.component('mapDisplay', {
    template: require('./map.html'),
    controller: require('./mapController'),
    //TODO: make it as standard binding
    bindings:{
      address:'=',
      longitude:'=',
      latitude:'=',
      editaddress:'=',
      editlongitude:'=',
      editlatitude:'='
    }
  });
};
