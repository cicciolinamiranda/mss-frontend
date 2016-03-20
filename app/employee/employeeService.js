module.exports = function(ngModule) {
  ngModule.service('EmployeeSvc', employeeService);
};

function employeeService(EmployeeRest, Employee, $q) {
  "ngInject";

  var listCache = {};
  this.list = function() {
    var deferred = $q.defer();
    deferred.resolve(listCache);

    EmployeeRest.listEmployees().then(function(data){
      data.employees.map(function(item){
        listCache[item.id] = new Employee(item);
      });
    });

    return deferred.promise;
  };

  var employeeCache = {};
  this.get = function(id) {
    var deferred = $q.defer();
    if (!employeeCache.hasOwnProperty(id)) employeeCache[id] = {};
    deferred.resolve(employeeCache[id]);

    EmployeeRest.getEmployee(id).then(function(data){
      angular.extend(employeeCache[id], new Employee(data));
    });

    return deferred.promise;
  };
}
