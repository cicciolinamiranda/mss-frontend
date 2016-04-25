module.exports = function(ngModule) {
  ngModule.service('RolesSvc', rolesService);
};

function rolesService($q, $gapi, ROLES_GAPI_BASE) {
  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('roles', 'v1', ROLES_GAPI_BASE);
  }).then(function() {
    return deferred.resolve();
  });

  this.getList = function() {
    var deferred2 = $q.defer();
    if (cache.hasOwnProperty(id)) {
      deferred2.resolve(cache[id]);
    }
    else {
      cache[id] = {};
      loadApi.then(function() {
        //temporary api call
        return $gapi.client.systemRoles.roles.getList();
      }).then(function(data) {
        angular.extend(cache[id], data);
        deferred2.resolve(cache[id]);
      });
    }
    return deferred2.promise;
  };
}
