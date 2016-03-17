module.exports = function(ngModule) {
  ngModule.service('EmployeeSvc', employeeService);
};

function employeeService(EmployeeRest) {
  "ngInject";
  this.list = function() {
    return EmployeeRest.listEmployees().then(function(data){
      return data.employees;
    });
  };
}
