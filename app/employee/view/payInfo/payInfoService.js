module.exports = function(ngModule) {
  ngModule.service('PayInfoSvc', payInfoService);
};

function payInfoService($q, $gapi) {
  var cache1 = [];
  var cache2 = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', true);
  }).then(function() {
    return deferred.resolve();
  });
  
  this.getEmployeeContractedHours = function getEmployeeContractedHours(id){
    var deferred2 = $q.defer();
    if (cache1.hasOwnProperty(id)) {
      deferred2.resolve(cache1[id]);
    }
    else {
      cache1[id] = {};
      loadApi.then(function() {
        return $gapi.client.employee.contractedHours.listByEmployeeId({employeeId: id});
      }).then(function(data) {
        angular.extend(cache1[id], data);
        deferred2.resolve(cache1[id]);
      });
    }
    return deferred2.promise;
  }

  this.getPayRates = function getPayRates(id){
    var deferred3 = $q.defer();
    if (cache2.hasOwnProperty(id)) {
      deferred3.resolve(cache2[id]);
    }
    else {
      cache2[id] = {};
      loadApi.then(function() {
        return $gapi.client.employee.payRates.listByEmployeeId({employeeId: id});
      }).then(function(data) {
        angular.extend(cache2[id], data);
        deferred3.resolve(cache2[id]);
      });
    }
    return deferred3.promise;
  }
}