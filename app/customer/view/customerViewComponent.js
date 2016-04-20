module.exports = function(ngModule) {
  ngModule.component('customerView', {
    template: require('./customerView.html'),
    controller: require('./customerViewController')
  });
};
