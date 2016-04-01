module.exports = function(ngModule) {
  ngModule.service('ViewLocationSvc', viewLocationService);
};

function viewLocationService($http, $q) {

  var _this = this;

  _this.getLocationDetails = getLocationDetails;
  _this.getBilledCostType = getBilledCostType;
  _this.locDetails;

  function getLocationDetails(id){
    var def = $q.defer();

    $http.get("http://localhost:3000/customerLocation", {params:{"id": id}})
         .success(function(response) {
              _this.locDetails = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }

  function getBilledCostType(id){
    var def = $q.defer();

    $http.get("http://localhost:3000/billedCostType", {params:{"id": id}})
         .success(function(response) {
              _this.billedCostType = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }

}
