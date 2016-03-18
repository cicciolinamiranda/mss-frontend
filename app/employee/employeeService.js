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

  this.get = function(id) {
		return EmployeeRest.getEmployee(id).then(function(data){
  		return new Employee(data);
  	});
  };
}
