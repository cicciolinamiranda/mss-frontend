module.exports = function(ngModule) {
  ngModule.service('EditLocationSvc', editLocationService);
};

var moment = require('moment');

function editLocationService($http, $q, $gapi, GAPI_BASE, MOCK_BASE) {

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
  _this.getCustomerLocation = getCustomerLocation;
  _this.getProofofDutyValues = getProofofDutyValues;
  _this.getMethodOfRecordingValues = getMethodOfRecordingValues;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  this.update = function (customerLocationDetails) {
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.update(
        transformJsonToDTO(customerLocationDetails)
      );
    }).then(function (data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };

  function searchMockModeOfTransport(keyword){
    var def = $q.defer();

    $http.get(MOCK_BASE + "/modeOfTransport", {params:{"q": keyword}})
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

    $http.get(MOCK_BASE + "/billedCostType")
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

    $http.get(MOCK_BASE + "/skills", {params:{"q": keyword}})
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

    $http.get(MOCK_BASE + "/equipments", {params:{"q": keyword}})
    .success(function(response) {
      _this.protectiveEquipment = response;
      def.resolve(response);
    })
    .error(function() {
      def.reject("Server is down.");
    });
    return def.promise;
  }

  function getCustomerLocation(id) {
    var def = $q.defer();
    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.get({'id' : id});
      def.resolve(transformDTOtoJSON(response));
    }).then(function (data) {
      def.resolve(transformDTOtoJSON(data));
    });
    return def.promise;
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

  function transformDTOtoJSON(response) {
    customerLocation = {
      workOrderId : response.workOrderId,
      id : response.id,
      editaddress : response.address.address,
      editlongitude : response.address.longitude,
      editlatitude : response.address.latitude,
      protectiveEquipment : checkListIfNull(response.equipments),
      modeOfTransport : checkListIfNull(response.modeOfTransports),
      siteSkills : checkListIfNull(response.skills),
      siteSkillsChoices: checkListIfNull(response.skills),
      siteContactDetails : checkListIfNull(response.siteLocations),
      startDate : transformJodaTimeToDate(response.startDate),
      endDate : transformJodaTimeToDate(response.endDate),
      barredEmployees : formatBarredEmployeesToJSON(response.barredEmployees),
      createdDate: transformJodaTimeToDate(response.createdDate)
    };
    return customerLocation;
  }

  function transformJsonToDTO(json) {
    _this.customerDetails = {
      'workOrderId': json.workOrderId,
      'id': json.id,
      'name': '',
      'equipments': json.protectiveEquipment,
      'modeOfTransports': json.modeOfTransport,
      'skills': json.siteSkills,
      'tasks': [],
      'barredEmployees': formatBarredEmployeesToDTO(json.barredEmployees),
      'incidentLogs': [],
      'address':{
        'address':json.editaddress,
        'latitude':json.editlatitude,
        'longitude':json.editlongitude
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

  function transformJodaTimeToDate(jodatime) {
    var date;
      if(undefined !== jodatime) {
        date = moment((jodatime.monthOfYear+"/"+jodatime.dayOfMonth+"/"+jodatime.year),"MM/DD/YYYY").toDate();
      }
    return date;
  }

  function formatBarredEmployeesToJSON(barredEmployees) {
    var barredEmployeesList =[];
    if(barredEmployees){
      for(i = 0; i < barredEmployees.length; i++){
        var emp = {};
        emp.employeeId = barredEmployees[i].employeeId;
        emp.lastName = barredEmployees[i].lastName;
        emp.firstName = barredEmployees[i].firstName;
        emp.startDate = transformJodaTimeToDate(barredEmployees[i].startDate);
        emp.endDate = transformJodaTimeToDate(barredEmployees[i].endDate);
        barredEmployeesList.push(emp);
      }
    }
    return barredEmployeesList;
  }

  function formatBarredEmployeesToDTO(barredEmployees) {
    var barredEmployeesList =[];
    if(barredEmployees){
      for(i = 0; i < barredEmployees.length; i++){
        var emp = {};
        emp.employeeId = barredEmployees[i].employeeId;
        emp.lastName = barredEmployees[i].lastName;
        emp.firstName = barredEmployees[i].firstName;
        emp.startDateStr = moment(barredEmployees[i].startDate).format("MM/DD/YYYY");
        emp.endDateStr = moment(barredEmployees[i].endDate).format("MM/DD/YYYY");
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

}
