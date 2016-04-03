module.exports = function(ngModule) {
  ngModule.service('EditLocationSvc', editLocationService);
};

var moment = require('moment');

function editLocationService($http, $q, $gapi) {

  var _this = this;
  _this.modeOfTransportMock;
  _this.billedCostType;
  _this.siteSkills;
  _this.protectiveEquipment;

  _this.searchMockModeOfTransport = searchMockModeOfTransport;
  _this.getBilledCostTypeValues = getBilledCostTypeValues;
  _this.searchSiteSkills = searchSiteSkills;
  _this.searchProtectiveEquipment = searchProtectiveEquipment;
  _this.getCustomerLocation = getCustomerLocation;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', true);
  }).then(function () {
    return deferred.resolve();
  });

  this.update = function (customerLocationDetails) {
    console.log("update: "+ JSON.stringify(customerLocationDetails));
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

    // $http.get("http://localhost:3000/customerLocation", {params:{"q": id}})
    // .success(function(response) {
    //   def.resolve(transformDTOtoJSON(response[0]));
    // })
    // .error(function() {
    //   def.reject("Server is down.");
    // });

    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.get({'id' : id});
      def.resolve(transformDTOtoJSON(response));
    }).then(function (data) {
      def.resolve(transformDTOtoJSON(data));
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
      protectiveEquipment : response.equipments,
      modeOfTransport : response.modeOfTransports,
      siteSkills : response.skills,
      siteContactDetails : response.siteLocations,
      startDate : transformJodaTimeToDate(response.startDate),
      endDate : transformJodaTimeToDate(response.endDate),
      barredEmployees : formatBarredEmployees(response.barredEmployees),
      createdDate: transformJodaTimeToDate(response.createdDate)
    };
    console.log("transformDTOtoJSON: "+customerLocation);
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
      'barredEmployees': json.barredEmployees,
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

  function formatBarredEmployees(barredEmployees) {
    console.log("BARRED EMPLOYEES");
    var barredEmployeesList =[];
    if(barredEmployees){
      for(i = 0; i < barredEmployees.length; i++){
        var emp = {};
        emp.name = barredEmployees[i].lastName +
          ", " + barredEmployees[i].firstName;
        emp.startDate = transformJodaTimeToDate(barredEmployees[i].startDate);
        emp.endDate = transformJodaTimeToDate(barredEmployees[i].startDate);
        barredEmployeesList.push(emp);
      }
    }
    return barredEmployeesList;
  }

}
