module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl(FileUploader, CreateLocationSvc, $state, $stateParams) {
  var _this = this;
  _this.location = {};

  //Contact Details
  _this.addSiteContactField = addSiteContactField;
  _this.removeFromContactsList = removeFromContactsList;

  //Modes of Transport
  _this.selectedTransport;
  _this.transportChoices;
  _this.refreshMotSearch = refreshMotSearch;

  //Site Skills
  _this.selectedSiteSkills;
  _this.siteSkillsChoices;
  _this.refreshSkillsSearch = refreshSkillsSearch;

  //Barred Employees
  _this.addBarredEmployee = addBarredEmployee;
  _this.checkBarredSelected = checkBarredSelected;

  //Protective Equipment
  _this.protectiveEquipmentChoices;
  _this.selectedProtectiveEquipment;
  _this.costTypeDefault;
  _this.refreshProtectiveEquipmentSearch = refreshProtectiveEquipmentSearch;

  //Proof Of Duty
  _this.selectedProofOfDuty;
  _this.proofOfDuties;
  _this.getProofOfDuties = getProofOfDuties;
  _this.updateProofOfDuty = updateProofOfDuty;

  //Method Of Recording
  _this.selectedMethodOfRecording;
  _this.methodOfRecordings;
  _this.getMethodOfRecordings = getMethodOfRecordings;
  _this.updateMethodOfRecording = updateMethodOfRecording;

  //Common
  _this.removeFromArray = removeFromArray;
  _this.addToArray = addToArray;
  _this.costTypeChoices;
  _this.errMessage;
  _this.goToViewWorkOrderLocation = goToViewWorkOrderLocation;

  //Save Customer Details
  _this.saveCustomerLocation = saveCustomerLocation;

  _this.customerLocationId = '';

  function init() {
    _this.location.workOrderId = $stateParams.workOrderId;
    _this.location.startDate = moment().toDate();
    _this.location.surveyReviewDate = moment().toDate();
    _this.location.locationSurvey = "";
    _this.location.standardOps = "";
    _this.location.locInstructions = "";
    _this.location.healthSafetySurvey = "";
    _this.location.technicalSurvey = "";
    _this.location.floorPlanUploader = new FileUploader();
    _this.location.modeOfTransport = [];
    _this.location.siteSkills = [];
    _this.location.protectiveEquipment = [];
    _this.location.barredEmployees = [];
    _this.location.siteContactDetails = [];
    _this.location.proofOfDuty = {};
    _this.location.methodOfRecording = {};

    CreateLocationSvc.getBilledCostTypeValues().then(function (costTypeResponse) {
      _this.costTypeChoices = costTypeResponse;
      if (_this.costTypeChoices.length > 0) {
        _this.costTypeDefault = costTypeResponse[0].id;
      }
    }, function (error) {
      _this.errMessage = error;
    });
  }

  init();

  function addBarredEmployee(employee) {
    employee.startDate = moment().toDate();
    employee.id = employee.id;
    employee.employeeId = employee.id;
    employee.firstName = employee.firstname;
    employee.lastName = employee.surname;
    employee.deleted = false;
    _this.location.barredEmployees.push(employee);
  }

  function removeFromArray(array, id) {
    for (i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }

  function addToArray(array, item) {
    array.push(item);
  }

  function refreshMotSearch(keyword) {
    CreateLocationSvc.searchMockModeOfTransport(keyword).then(function (modeOfTransportMock) {
      _this.transportChoices = modeOfTransportMock;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function refreshSkillsSearch(keyword) {
    CreateLocationSvc.searchSiteSkills(keyword).then(function (response) {
      _this.siteSkillsChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function refreshProtectiveEquipmentSearch(keyword) {
    CreateLocationSvc.searchProtectiveEquipment(keyword).then(function (response) {
      _this.protectiveEquipmentChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function checkBarredSelected(id) {
    //manual linear search for duplicates. possible use of utility here
    for (i = 0; i < _this.location.barredEmployees.length; i++) {
      if (id === _this.location.barredEmployees[i].id || true === _this.location.barredEmployees[i].deleted) {
        return true;
      }
    }
    return false;
  }

  function addSiteContactField() {
    _this.location.siteContactDetails.push(
    {siteLocationName: "", contactNumber: "", siteLocationEmail: "", index: _this.location.siteContactDetails.length}
    );
  }

  function removeFromContactsList(index) {
    _this.location.siteContactDetails.splice(index, 1);

    for (i = 0; i < _this.location.siteContactDetails.length; i++) {
      _this.location.siteContactDetails[i].index = i;
    }
  }

  function saveCustomerLocation() {
    CreateLocationSvc.save(_this.location).then(function (response) {
      _this.customerLocationId = response.id;
      $state.go('location.view', {id: _this.customerLocationId});
    }, function (error) {
      _this.errMessage = error;
    })
  }

  function getProofOfDuties(){
    CreateLocationSvc.getProofofDutyValues().then(function(response){
      _this.proofOfDuties = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function getMethodOfRecordings(){
    CreateLocationSvc.getMethodOfRecordingValues().then(function(response){
      _this.methodOfRecordings = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function updateProofOfDuty(value){
    _this.location.proofOfDuty = value;
  }

  function updateMethodOfRecording(value){
    _this.location.methodOfRecording = value;
  }

  function goToViewWorkOrderLocation() {
    $state.go('workOrder', {id: 1});
  }
}
