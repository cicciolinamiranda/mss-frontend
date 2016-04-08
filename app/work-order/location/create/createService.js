module.exports = function (ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

var moment = require('moment');

function createLocationService($http, $q, $gapi, WORKORDER_GAPI_BASE) {

  var _this = this;
  _this.modeOfTransportMock;
  _this.billedCostType;
  _this.siteSkills;
  _this.protectiveEquipment;
  _this.proofOfDuties;
  _this.methodOfRecordings;

  _this.searchMockModeOfTransport = searchMockModeOfTransport;
  _this.searchSiteSkills = searchSiteSkills;
  _this.searchProtectiveEquipment = searchProtectiveEquipment;
  _this.getProofofDutyValues = getProofofDutyValues;
  _this.getMethodOfRecordingValues = getMethodOfRecordingValues;

  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', WORKORDER_GAPI_BASE);
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
      'sopDetails': json.standardOps,
      'locationInstructionsApproval': json.locInstructions,
      'healthSafetySurvey': json.healthSafetySurvey,
      'technicalSurvey': json.technicalSurvey,
      'locationSurvey': json.locationSurvey,
      'locationSurverDateStr':formatMomentDateThatMustBeNull(json.surveyReviewDate),
      'floorPlan': '',
      'customer': {
        'id':'1'
      },
      'siteLocations': json.siteContactDetails,
      'startDateStr': moment(json.startDate).format("MM/DD/YYYY"),
      'proofOfDuty': json.proofOfDuty,
      'methodOfRecording': json.methodOfRecording,
      'statusStr': 'IN_PROGRESS'
    };
    return _this.customerDetails;
  }

    function getProofofDutyValues(){
        var def = $q.defer();

        loadApi.then(function () {
          return $gapi.client.workorder.master.file.proofofduty.list();
        }).then(function (data) {
          def.resolve(data.items);
        });
        return def.promise;
    }

    function getMethodOfRecordingValues(){
        var def = $q.defer();

        loadApi.then(function () {
          return $gapi.client.workorder.master.file.methodofrecording.list();
        }).then(function (data) {
          def.resolve(data.items);
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
          emp.startDateStr = moment(barredEmployees[i].startDate).format("MM/DD/YYYY");
          if(barredEmployees[i].endDate != null){
            emp.endDateStr = moment(barredEmployees[i].endDate).format("MM/DD/YYYY");
          }
          barredEmployeesList.push(emp);
        }
      }
      return barredEmployeesList;
    }

    function checkListIfNull(list) {
      if(undefined == list)
      {
        list = [];
      }
      return list;
    }

    function formatMomentDateThatMustBeNull(date) {
      var returnDate = null;
      if(undefined !== date) {
        returnDate = moment(date).format("MM/DD/YYYY");
      }
      return returnDate;
    }
}
