module.exports = function (ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

function createLocationService($http, $q, $gapi) {

  var _this = this;
  _this.modeOfTransportMock;
  _this.billedCostType;
  _this.siteSkills;
  _this.protectiveEquipment;

  _this.searchMockModeOfTransport = searchMockModeOfTransport;
  _this.getBilledCostTypeValues = getBilledCostTypeValues;
  _this.searchSiteSkills = searchSiteSkills;
  _this.searchProtectiveEquipment = searchProtectiveEquipment;
  _this.saveCustomerLocation = saveCustomerLocation;

  function searchMockModeOfTransport(keyword) {
    var def = $q.defer();

    $http.get("http://localhost:3000/modeOfTransport", {params: {"q": keyword}})
        .success(function (response) {
          _this.modeOfTransportMock = response;
          def.resolve(response);
        })
        .error(function () {
          def.reject("Server is down.");
        });
    return def.promise;
  }

  function getBilledCostTypeValues() {
    var def = $q.defer();

    $http.get("http://localhost:3000/billedCostType")
        .success(function (response) {
          _this.billedCostType = response;
          def.resolve(response);
        })
        .error(function () {
          def.reject("Server is down.");
        });
    return def.promise;
  }

  function searchSiteSkills(keyword) {
    var def = $q.defer();

    $http.get("http://localhost:3000/skills", {params: {"q": keyword}})
        .success(function (response) {
          _this.siteSkills = response;
          def.resolve(response);
        })
        .error(function () {
          def.reject("Server is down.");
        });
    return def.promise;
  }


  function searchProtectiveEquipment(keyword) {
    var def = $q.defer();

    $http.get("http://localhost:3000/equipments", {params: {"q": keyword}})
        .success(function (response) {
          _this.siteSkills = response;
          def.resolve(response);
        })
        .error(function () {
          def.reject("Server is down.");
        });
    return def.promise;
  }

  function saveCustomerLocation(customerLocationDetails) {
    var cache = {};
    var deferred = $q.defer();
    var loadApi = deferred.promise;

    $gapi.loaded.then(function () {
      return $gapi.load('workorder', 'v1', true);
    }).then(function () {
      return deferred.resolve();
    });

    this.get = function (id) {
      var deferred2 = $q.defer();
      loadApi.then(function () {
        return $gapi.client.workorder.customer.location.add({'customerLocationDTO': customerLocationDetails});
      }).then(function (data) {
        angular.extend(cache[id], data);
        deferred2.resolve(cache[id]);
      });
      return deferred2.promise;
    };
  }
}
