module.exports = function(ngModule) {
  ngModule.service('EmployeeRest', restService);
};

function restService($q, $gapi) {
  "ngInject";

  var loadGApi = $gapi.loaded;
  var deferred = $q.defer();
  var loadApi = deferred.promise;
  loadGApi.then(function(){
    return $gapi.load('employee', 'v1', true);
  }).then(function(){
    return deferred.resolve();
  });

  this.listEmployees = function() {
    return loadApi.then(function(){
      return $gapi.client.employee.employees.list();
    });
  };

  this.getEmployee = function(id) {
    return loadApi.then(function(){
      return $gapi.client.employee.employees.get({id: id});
    });
  };

}