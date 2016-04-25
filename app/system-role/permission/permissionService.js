module.exports = function(ngModule) {
  ngModule.service('PermissionsSvc', permissionsSvc);
};

function permissionsSvc($q, $gapi, ROLES_GAPI_BASE) {
  var cache1 = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('roles', 'v1', ROLES_GAPI_BASE);
  }).then(function() {
    return deferred.resolve();
  });

  this.getPermissionsById= function getPermissionsById(roleId){
    var deferred2 = $q.defer();
    if (cache1.hasOwnProperty(roleId)) {
      deferred2.resolve(cache1[roleId]);
    }
    else {
      cache1[roleId] = {};
      loadApi.then(function() {
        //This will be replaced as soon as the the roles & permissions API is complete
        return $gapi.client.systemRoles.permissions.listByRoleId({roleId: roleId});
      }).then(function(data) {
        angular.extend(cache1[roleId], data);
        deferred2.resolve(cache1[roleId]);
      });
    }
    return deferred2.promise;
  }


}
