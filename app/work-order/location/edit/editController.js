module.exports = editCtrl;

var moment = require('moment');

/*@ngInject*/
function editCtrl(FileUploader, EditLocationSvc, LocationModel, $stateParams,$state) {
  var _this = this;
  _this.location = {};
  _this.model = new LocationModel();

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
  _this.changeLiftedStatus = changeLiftedStatus;
  _this.checkStartEndDate = checkStartEndDate;

  //Protective Equipment
  _this.protectiveEquipmentChoices;
  _this.selectedProtectiveEquipment;
  _this.costTypeSelected;
  _this.refreshProtectiveEquipmentSearch = refreshProtectiveEquipmentSearch;
  _this.costTypeDefault;

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
  _this.hideFromDisplay = hideFromDisplay;
  _this.addToArray = addToArray;
  _this.errMessage;
  _this.goToViewLocation = goToViewLocation;
  _this.resetCostType = resetCostType;
  _this.costTypeInit = costTypeInit;
  _this.disableSave = false;
  //update
  _this.updateCustomerLocation = updateCustomerLocation;

  _this.customerLocationId = '';

  function init() {
    //this will be removed once the mapping on the service is completed
    _this.location.startDate = moment().toDate();
    _this.location.surveyReviewDate = moment().toDate();
    _this.location.floorPlanUploader = new FileUploader();

    _this.costTypeChoices = _this.model.costTypeChoices;
    _this.costTypeDefault = _this.model.costTypeDefault;

    getCustomerLocation($stateParams.id);


  }

  init();

  function checkStartEndDate (barredEmployees) {
    console.log("CHECKSTARTENDDATE");
    for(i= 0;i < barredEmployees.length; i++){
      console.log("END DATE: "+new Date(barredEmployees[i].endDate));
      console.log("START DATE: "+new Date(barredEmployees[i].startDate));
      if(new Date(barredEmployees[i].endDate) < new Date(barredEmployees[i].startDate)) {
        console.log("true");
        barredEmployees[i].displayError = true;
        _this.disableSave = true;
        return null;
      }
      else{
        console.log("false");
        barredEmployees[i].displayError = false;
        _this.disableSave = false;
      }
    }
  }

  function addBarredEmployee(employee) {

    employee.startDate = moment().toDate();
    employee.id = employee.id;
    employee.employeeId = employee.id;
    employee.firstName = employee.firstname;
    employee.lastName = employee.surname;
    employee.deleted = false;
    employee.isLifted = true;
    employee.displayError = false;

    _this.location.barredEmployees.push(employee);
  }

  function hideFromDisplay(array, id){
    for(i= 0; i < array.length; i++){
      if(array[i].id === id){
        if(undefined !== array[i].deleted) {
          array[i].deleted = true;
        }

      }
    }
  }

  function removeFromArray(array, id){
    for(i= 0; i < array.length; i++){
      if(array[i].id === id){
        array.splice(i, 1);
      }
    }
  }

  function addToArray(array, item){
    var newItem = angular.copy(item);
    newItem.deleted = false;
    if(array){

      for(i = 0; i < array.length; i++){
        if(array[i].id === newItem.id){
          return;
        }
      }

      array.push(newItem);
    }
  }

  function refreshMotSearch(keyword){
    EditLocationSvc.searchMockModeOfTransport(keyword).then(function(modeOfTransportMock){
      _this.transportChoices = modeOfTransportMock;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function refreshSkillsSearch(keyword){
    EditLocationSvc.searchSiteSkills(keyword).then(function(response){
      _this.siteSkillsChoices = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function refreshProtectiveEquipmentSearch(keyword){
    EditLocationSvc.searchProtectiveEquipment(keyword).then(function(response){
      _this.protectiveEquipmentChoices = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function checkBarredSelected(id){
    //manual linear search for duplicates. possible use of utility here
    for (i = 0; i < _this.location.barredEmployees.length; i++) {
      if (id === _this.location.barredEmployees[i].id || undefined === _this.location.barredEmployees[i].deleted) {
        return true;
      }
    }
    return false;
  }

  function addSiteContactField(){
    _this.location.siteContactDetails.push(
      {siteLocationName: "", contactNumber: "", siteLocationEmail: "", deleted:false, index: _this.location.siteContactDetails.length}
    );
  }

  function removeFromContactsList(index){
    //_this.location.siteContactDetails.splice(index, 1);

    for (i = 0; i < _this.location.siteContactDetails.length; i++) {

      if(_this.location.siteContactDetails[i].index == index && undefined !==  _this.location.siteContactDetails[i].deleted){
        _this.location.siteContactDetails[i].deleted = true;
      }
    }

  }

  function getCustomerLocation(id) {
    EditLocationSvc.getCustomerLocation(id).then(function(response){
      _this.location = response;
      //TODO Rework once backend for getMethodOfRecording
      if(_this.location.methodOfRecording){
        _this.selectedMethodOfRecording = {
          id: _this.location.methodOfRecording.id,
          name: _this.location.methodOfRecording.name
        };
      }
      _this.selectedProofOfDuty = _this.location.proofOfDuty;
      checkStartEndDate (_this.location.barredEmployees);
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function updateCustomerLocation() {
    EditLocationSvc.update(_this.location).then(function (response) {
      _this.customerLocationId = response.id
      goToViewLocation();
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function getProofOfDuties(){
    EditLocationSvc.getProofofDutyValues().then(function(response){
      _this.proofOfDuties = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function getMethodOfRecordings(){
    EditLocationSvc.getMethodOfRecordingValues().then(function(response){
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

  function goToViewLocation() {
    $state.go('location.view', {id: $stateParams.id});
  }

  function changeLiftedStatus(employee){
    if(employee.isLifted){
      employee.endDate = null;
    }else{
      employee.endDate = moment().toDate();
    }
  }

  function resetCostType(costType) {
    costType = _this.costTypeDefault;
  }

  function costTypeInit(data){
    if(!data.costType){
      data.costType = _this.model.costTypeDefault;
    }

  }
}
