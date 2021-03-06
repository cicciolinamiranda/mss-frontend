module.exports = function(ngModule) {
  ngModule.service('EmployeeListSvc', listService);
};

function listService($q, $gapi) {
  var cache = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', true);
  }).then(function() {
    return deferred.resolve();
  });

  this.list = function(pageNum) {
    pageNum = typeof pageNum !== 'undefined' ?  pageNum - 1 : 0;
    var deferred2 = $q.defer();
    if (cache[pageNum]) {
      deferred2.resolve(cache[pageNum]);
    }
    else {
      loadApi.then(function() {
        return $gapi.client.employee.employees.list();
      }).then(function(data) {
        cache[pageNum] = data.employees;
        deferred2.resolve(cache[pageNum]);
      });
    }
    return deferred2.promise;
  };
}
