module.exports = editCtrl;

var moment = require('moment');

/*@ngInject*/
function editCtrl(FileUploader, EditLocationSvc,$stateParams) {
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
  _this.costTypeSelected;
  _this.refreshProtectiveEquipmentSearch = refreshProtectiveEquipmentSearch;

  //Common
  _this.removeFromArray = removeFromArray;
  _this.addToArray = addToArray;
  _this.errMessage;
  _this.goToViewLocation = goToViewLocation;

  //update
  _this.updateCustomerLocation = updateCustomerLocation;

  _this.customerLocationId = '';

  function init() {
    //this will be removed once the mapping on the service is completed
    _this.location.startDate = moment().toDate();
    _this.location.surveyReviewDate = moment().toDate();
    _this.location.floorPlanUploader = new FileUploader();

    EditLocationSvc.getBilledCostTypeValues().then(function(costTypeMock){
      _this.costTypeChoices = costTypeMock;
    }, function (error) {
      _this.errMessage= error;
    });

    getCustomerLocation($stateParams.id);
  }

  init();

  function addBarredEmployee(employee){
    employee.barStartDate = moment().toDate();
    _this.location.barredEmployees.push(employee);
  }

  function removeFromArray(array, id){
    for(i= 0; i < array.length; i++){
      if(array[i].id === id){
        array.splice(i, 1);
      }
    }
  }

  function addToArray(array, item){
    array.push(item);
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
    for(i = 0; i < _this.location.barredEmployees.length; i++){
      if(id === _this.location.barredEmployees[i].id){
        return true;
      }
    }
    return false;
  }

  function addSiteContactField(){
    _this.location.siteContactDetails.push(
      {name: "", phone: "", email: "", index: _this.location.siteContactDetails.length}
    );
  }

  function removeFromContactsList(index){
    _this.location.siteContactDetails.splice(index, 1);

    for (i = 0; i < _this.location.siteContactDetails.length; i++) {
      _this.location.siteContactDetails[i].index = i;
    }
  }

  _this.test = function(){
    console.log(_this.location);
  }

  function getCustomerLocation(id) {
    EditLocationSvc.getCustomerLocation(id).then(function(response){
      console.log("ID in edit: "+id);
      console.log("RESPONSEEE:"+response);
      _this.location = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function updateCustomerLocation() {
    EditLocationSvc.update(_this.location).then(function (response) {
      _this.customerLocationId = response.id
      $state.go('location.view', {id: _this.customerLocationId});
    }, function (error) {
      _this.errMessage= error;
    });


  }

  //TODO change with actual save and page transition
  function goToViewLocation() {
    $state.go('location.view', {id: $stateParams.id});
  }
}
