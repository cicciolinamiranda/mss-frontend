module.exports = function(ngModule) {
  ngModule.component('employeeView', {
    template: require('./view.html'),
    controller: 'EmployeeViewCtrl',
    controllerAs: 'vm'
  });
};
