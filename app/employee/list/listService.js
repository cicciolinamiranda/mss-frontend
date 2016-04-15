module.exports = function(ngModule) {
  ngModule.service('EmployeeListSvc', listService);
};

function listService($q, $gapi, EMPLOYEE_GAPI_BASE, GAuth) {
  var cache = [];
  var searchCache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', EMPLOYEE_GAPI_BASE);
  }).then(function() {
    return deferred.resolve();
  });

  this.list = function(params) {
    var deferred2 = $q.defer();
    var localCache;

    var searchTerm = params.q;
    if (searchTerm) {
      if (!searchCache.hasOwnProperty(searchTerm))
        searchCache[searchTerm] = [];
      localCache = searchCache[searchTerm];
    }
    else localCache = cache;

    var pageNum = typeof params.pageNum !== 'undefined' ?  params.pageNum - 1 : 0;
    if (localCache[pageNum]) {
      deferred2.resolve(localCache[pageNum]);
    }
    else {
      loadApi.then(GAuth.protect(function() {
        return $gapi.client.employee.employees.list({q: searchTerm});
      })).then(function(data) {
        localCache[pageNum] = data.employees;
        deferred2.resolve(localCache[pageNum]);
      });
    }
    return deferred2.promise;
  };
}
