module.exports = function(ngModule) {
  ngModule.service('EmployeeViewRest', restService);
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

  this.getEmployee = function getEmployee(id) {
    return loadApi.then(function() {
      return $gapi.client.employee.employees.get({id: id});
    });
  };

}
