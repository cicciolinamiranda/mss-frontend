module.exports = function(ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

function createLocationService($http, $q) {

  var _this = this;
  _this.modeOfTransportMock;
  _this.billedCostType;

  _this.searchMockModeOfTransport = searchMockModeOfTransport;
  _this.getBilledCostTypeValues = getBilledCostTypeValues;

  function searchMockModeOfTransport(keyword){
    var def = $q.defer();

    $http.get("http://localhost:3000/modeOfTransport", {params:{"q": keyword}})
         .success(function(response) {
              _this.modeOfTransportMock = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }

  function getBilledCostTypeValues(){
    var def = $q.defer();

    $http.get("http://localhost:3000/billedCostType")
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
