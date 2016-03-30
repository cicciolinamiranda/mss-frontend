module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/ function createCtrl(FileUploader, CreateLocationSvc) {
  var _this = this;
  _this.location = {
    siteContactDetails: [
      {name: "", phone: "", email: "", index: 0}
    ]
  };
  _this.transportChoices;
  _this.selectedTransport;
  _this.siteSkillsChoices;
  _this.selectedSiteSkills;
  _this.protectiveEquipmentChoices;
  _this.selectedProtectiveEquipment;
  _this.addSiteContactField = addSiteContactField;
  _this.removeFromContactsList = removeFromContactsList;
  _this.refreshMotSearch = refreshMotSearch;
  _this.refreshSkillsSearch = refreshSkillsSearch;
  _this.refreshProtectiveEquipmentSearch = refreshProtectiveEquipmentSearch;
  _this.removeFromArray = removeFromArray;
  _this.addToArray = addToArray;
  _this.costTypeChoices;
  _this.errMessage;

  function init() {
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

    CreateLocationSvc.getBilledCostTypeValues().then(function(costTypeMock){
      _this.costTypeChoices = costTypeMock;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  init();

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
    CreateLocationSvc.searchMockModeOfTransport(keyword).then(function(modeOfTransportMock){
      _this.transportChoices = modeOfTransportMock;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function refreshSkillsSearch(keyword){
    CreateLocationSvc.searchSiteSkills(keyword).then(function(response){
      _this.siteSkillsChoices = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  function refreshProtectiveEquipmentSearch(keyword){
    CreateLocationSvc.searchProtectiveEquipment(keyword).then(function(response){
      _this.protectiveEquipmentChoices = response;
    }, function (error) {
      _this.errMessage= error;
    });
  }

  _this.test = function(){
    console.log(_this.location);
  }
}
