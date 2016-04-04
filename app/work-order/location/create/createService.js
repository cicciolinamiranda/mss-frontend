module.exports = function (ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

var moment = require('moment');

function createLocationService($http, $q, $gapi, GAPI_BASE, MOCK_BASE) {

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

  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', GAPI_BASE);
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

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.transport.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getBilledCostTypeValues() {
    var def = $q.defer();

    $http.get(MOCK_BASE + "/billedCostType")
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

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.skills.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function searchProtectiveEquipment(keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.equipment.list();
    }).then(function (data) {
      def.resolve(data.items);
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
      'barredEmployees': formatBarredEmployeesToJSON(json.barredEmployees),
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

    function getProofofDutyValues(){
        var def = $q.defer();

        $http.get(MOCK_BASE + "/proofOfDuty")
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

        $http.get(MOCK_BASE + "/methodOfRecording")
            .success(function(response) {
                _this.proofOfDuties = response;
                def.resolve(response);
            })
            .error(function() {
                def.reject("Server is down.");
            });
        return def.promise;
    }

    function formatBarredEmployeesToJSON(barredEmployees) {
      var barredEmployeesList =[];
      if(barredEmployees){
        for(i = 0; i < barredEmployees.length; i++){
          var emp = {};
          emp.employeeId = barredEmployees[i].employeeId;
          emp.lastName = barredEmployees[i].lastName;
          emp.firstName = barredEmployees[i].firstName;
          emp.startDate = moment(barredEmployees[i].startDate).format("MM/DD/YYYY");
          barredEmployeesList.push(emp);
        }
      }
      return barredEmployeesList;
    }
}
