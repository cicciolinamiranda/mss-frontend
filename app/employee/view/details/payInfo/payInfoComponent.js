module.exports = function(ngModule) {
  ngModule.component('payInfo', {
    template: require('./payInfo.html'),
    controller: require('./payInfoController'),
    // controller: function(){
    //   console.log('XXX=--->', this);
    // },
    bindings: {
      employeeid: '='
    }
  });
};