module.exports = function(ngModule) {
  ngModule.service('EmployeeListSvc', employeeService);
};

function employeeService($q, $gapi) {
  "ngInject";

  /**
  TODO: since this is a list where order is relevant,
    we should pass an array instead of the cache obj
  */
  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', true);
  }).then(function() {
    return deferred.resolve();
  });

  this.list = function list() {
    var deferred2 = $q.defer();
    deferred2.resolve(cache);

    loadApi.then(function() {
      return $gapi.client.employee.employees.list();
    }).then(function(data) {
      data.employees.map(function(item) {
        cache[item.id] = item;
      });
    });

    return deferred2.promise;
  };
}
