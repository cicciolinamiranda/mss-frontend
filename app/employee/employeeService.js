module.exports = function(ngModule) {
  ngModule.service('EmployeeSvc', employeeService);
};

function employeeService(EmployeeRest, Employee) {
  "ngInject";
  // TODO: cache the list
  this.list = function() {
    return EmployeeRest.listEmployees().then(function(data){
      return data.employees.map(function(item){
        return new Employee(item);
      });
    });
  };

  // TODO: cache the data
  this.get = function(id) {
		return EmployeeRest.getEmployee(id).then(function(data){
  		return new Employee(data);
  	});
  };
}
