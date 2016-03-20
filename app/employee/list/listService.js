module.exports = function(ngModule) {
  ngModule.service('EmployeeListSvc', employeeService);
};

function employeeService(EmployeeListRest, $q) {
  "ngInject";

  /**
  TODO: since this is a list where order is relevant,
    we should pass an array instead of the cache obj
  */
  var cache = {};
  this.list = function list() {
    var deferred = $q.defer();
    deferred.resolve(cache);

    EmployeeListRest.listEmployees().then(function(data) {
      data.employees.map(function(item) {
        cache[item.id] = item;
      });
    });

    return deferred.promise;
  };
}
