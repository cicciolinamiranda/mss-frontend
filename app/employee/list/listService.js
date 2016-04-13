module.exports = function(ngModule) {
  ngModule.service('EmployeeListSvc', listService);
};

function listService($q, $gapi, EMPLOYEE_GAPI_BASE, GAuth) {
  var cache = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', EMPLOYEE_GAPI_BASE);
  }).then(function() {
    return deferred.resolve();
  });

  this.list = function(params) {
    console.log(params.q);
    if (params.q) console.log("*** THIS IS A SEARCH ***");
    params.pageNum = typeof params.pageNum !== 'undefined' ?  params.pageNum - 1 : 0;
    var deferred2 = $q.defer();
    if (cache[params.pageNum]) {
      deferred2.resolve(cache[params.pageNum]);
    }
    else {
      loadApi.then(GAuth.protect(function() {
        return $gapi.client.employee.employees.list();
      })).then(function(data) {
        cache[params.pageNum] = data.employees;
        deferred2.resolve(cache[params.pageNum]);
      });
    }
    return deferred2.promise;
  };
}
