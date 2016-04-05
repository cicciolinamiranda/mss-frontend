module.exports = function(ngModule) {
  ngModule.service('AttributesSvc', attributesService);
};

function attributesService($q, $gapi) {
  var cache = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', true);
  }).then(function() {
    return deferred.resolve();
  });

  this.getAttributes = function(id) {
    var deferred2 = $q.defer();
    if (cache.hasOwnProperty(id)) {
      deferred2.resolve(cache[id]);
    }
    else {
      cache[id] = {};
      loadApi.then(function() {
        return $gapi.client.employee.attributes.listByEmployeeId({employeeId: id});
      }).then(function(data) {
        angular.extend(cache[id], data);
        deferred2.resolve(cache[id]);
      });
    }
    return deferred2.promise;
  };
}
