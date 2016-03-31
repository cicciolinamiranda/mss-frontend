module.exports = function(ngModule) {
  ngModule.component('mapDisplay', {
    template: require('./map.html'),
    controller: require('./mapController'),
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
