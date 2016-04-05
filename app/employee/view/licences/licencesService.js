module.exports = function(ngModule) {
  ngModule.service('LicencesSvc', licencesService);
};

function licencesService($q, $gapi, EMPLOYEE_GAPI_BASE) {
  var cache = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', EMPLOYEE_GAPI_BASE);
  }).then(function() {
    return deferred.resolve();
  });

  this.getPaymentRate = function(id) {
    var deferred2 = $q.defer();
    if (cache.hasOwnProperty(id)) {
      deferred2.resolve(cache[id]);
    }
    else {
      cache[id] = {};
      loadApi.then(function() {
        return $gapi.client.employee.licences.listByEmployeeId({employeeId: id});
      }).then(function(data) {
        angular.extend(cache[id], data);
        deferred2.resolve(cache[id]);
      });
    }
    return deferred2.promise;
  };
}
