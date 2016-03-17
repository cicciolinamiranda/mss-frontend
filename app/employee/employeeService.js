module.exports = function(ngModule) {
  ngModule.service('EmployeeSvc', employeeService);
};

function employeeService(EmployeeRest, Employee) {
  "ngInject";
  this.list = function() {
    return EmployeeRest.listEmployees().then(function(data){
      return data.employees.map(function(item){
        return new Employee(item);
      });
    });
  };
}
