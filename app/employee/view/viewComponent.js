module.exports = function(ngModule) {
  ngModule.component('employeeView', {
    template: require('./view.html'),
    controller: require('./viewController')
  })
  .component('employeePay', {
    template: require('./viewPayInfo.html'),
    controller: require('./viewPayInfoController')
  });
};