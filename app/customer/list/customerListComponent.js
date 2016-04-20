module.exports = function(ngModule) {
  ngModule.component('customerList', {
    template: require('./customerList.html'),
    controller: require('./customerListController')
  });
};
