module.exports = function (ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

var moment = require('moment');

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

  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', true);
  }).then(function () {
    return deferred.resolve();
  });

  this.save = function (customerLocationDetails) {
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.save(
        transformJsonToDTO(customerLocationDetails)
      );
    }).then(function (data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };

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

  function transformJsonToDTO(json) {
    console.log(json.workOrderId);
    _this.customerDetails = {
      'workOrderId': json.workOrderId,
      'name': '',
      'equipments': json.protectiveEquipment,
      'modeOfTransports': json.modeOfTransport,
      'skills': json.siteSkills,
      'tasks': [],
      'barredEmployees': json.barredEmployees,
      'incidentLogs': [],
      'address':{
        'address':json.address,
        'latitude':json.latitude,
        'longitude':json.longitude
      },
      'sopDetails': '',
      'locationInstructionsApproval': json.locInstructions,
      'healthSafetySurvey': json.healthSafetySurvey,
      'technicalSurvey': json.technicalSurvey,
      'locationSurvey': json.locationSurvey,
      'floorPlan': '',
      'customer': {
        'id':'1'
      },
      'siteLocations': [],
      'startDateStr': moment(json.startDate).format("MM/DD/YYYY"),
      'endDateStr': moment(json.endDate).format("MM/DD/YYYY"),
      'statusStr': 'IN_PROGRESS'
    };

    return _this.customerDetails;
  }
}
