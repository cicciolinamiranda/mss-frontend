module.exports = function(ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

function createLocationService($http, $q) {

  var _this = this;
  _this.modeOfTransportMock;
  _this.billedCostType;
  _this.siteSkills;
  _this.protectiveEquipment;
    _this.proofOfDuties;
    _this.methodOfRecordings;

  _this.searchMockModeOfTransport = searchMockModeOfTransport;
  _this.getBilledCostTypeValues = getBilledCostTypeValues;
  _this.searchSiteSkills = searchSiteSkills;
  _this.searchProtectiveEquipment = searchProtectiveEquipment;
    _this.getProofofDutyValues = getProofofDutyValues;
    _this.getMethodOfRecordingValues = getMethodOfRecordingValues;

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

    function getProofofDutyValues(){
        var def = $q.defer();

        $http.get("http://localhost:3000/proofOfDuty")
            .success(function(response) {
                _this.proofOfDuties = response;
                def.resolve(response);
            })
            .error(function() {
                def.reject("Server is down.");
            });
        return def.promise;
    }

    function getMethodOfRecordingValues(){
        var def = $q.defer();

        $http.get("http://localhost:3000/methodOfRecording")
            .success(function(response) {
                _this.proofOfDuties = response;
                def.resolve(response);
            })
            .error(function() {
                def.reject("Server is down.");
            });
        return def.promise;
    }
}
