module.exports = function(ngModule) {
  ngModule.service('PayInfoSvc', payInfoService);
};

function payInfoService($q, $gapi) {
  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', true);
  }).then(function() {
    return deferred.resolve();
  });
  
  this.getEmployeeContractedHours = function getEmployeeContractedHours(id){
    var deferred3 = $q.defer();
    if (cache.hasOwnProperty(id)) {
      deferred3.resolve(cache[id]);
    }
    else {
      cache[id] = {};
      loadApi.then(function() {
        return $gapi.client.employee.contractedHours.listByEmployeeId({employeeId: id});
      }).then(function(data) {
        angular.extend(cache[id], data);
        deferred3.resolve(cache[id]);
      });
    }
    return deferred3.promise;
  }
}