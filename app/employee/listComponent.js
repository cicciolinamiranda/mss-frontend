module.exports = function(ngModule) {
  ngModule.component('employeeList', {
    template: require('./list.html'),
    controller: 'EmployeeListCtrl',
    controllerAs: 'vm'
  });
};
