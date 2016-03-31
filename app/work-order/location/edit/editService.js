module.exports = function(ngModule) {
  ngModule.service('EditLocationSvc', editLocationService);
};

function editLocationService($http, $q) {

  var _this = this;
  _this.modeOfTransportMock;
  _this.billedCostType;
  _this.siteSkills;
  _this.protectiveEquipment;

  _this.searchMockModeOfTransport = searchMockModeOfTransport;
  _this.getBilledCostTypeValues = getBilledCostTypeValues;
  _this.searchSiteSkills = searchSiteSkills;
  _this.searchProtectiveEquipment = searchProtectiveEquipment;

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

  function searchSiteSkills(keyword){
    var def = $q.defer();

    $http.get("http://localhost:3000/skills", {params:{"q": keyword}})
         .success(function(response) {
              _this.siteSkills = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }


  function searchProtectiveEquipment(keyword){
    var def = $q.defer();

    $http.get("http://localhost:3000/equipments", {params:{"q": keyword}})
         .success(function(response) {
              _this.siteSkills = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }

  function getCustomerLocation(id) {
    var def = $q.defer();

    $http.get("http://localhost:3000/customerLocation", {params:{"q": id}})
         .success(function(response) {
              _this.customerLocation = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }
}
