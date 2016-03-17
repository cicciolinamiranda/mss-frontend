module.exports = function(ngModule) {
  ngModule.service('EmployeeRestSvc', restService);
};

function restService($q, $gapi) {
  "ngInject";

  var loadGApi = $gapi.loaded;
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  loadGApi.then(function(){
    loadApi = $gapi.load('employee', 'v1', true);
  });

  this.listEmployees = function() {
    return loadApi.then(function(){
      return $gapi.client.employee.employees.list();
    });
  };

}
