module.exports = function(ngModule) {
  ngModule.service('EmployeeListRest', restService);
};

function restService($q, $gapi) {
  "ngInject";

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('employee', 'v1', true);
  }).then(function() {
    return deferred.resolve();
  });

  this.listEmployees = function listEmployees() {
    return loadApi.then(function() {
      return $gapi.client.employee.employees.list();
    });
  };
}
