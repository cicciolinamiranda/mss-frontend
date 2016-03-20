module.exports = function(ngModule) {
  ngModule.service('EmployeeViewSvc', employeeService);
};

function employeeService(EmployeeViewRest, $q) {
  "ngInject";
  var cache = {};

  this.get = function get(id) {
    var deferred = $q.defer();
    if (!cache.hasOwnProperty(id)) cache[id] = {};
    deferred.resolve(cache[id]);

    EmployeeViewRest.getEmployee(id).then(function(data) {
      angular.extend(cache[id], data);
    });

    return deferred.promise;
  };
}
