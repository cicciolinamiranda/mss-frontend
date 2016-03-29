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
  _this.selectedTransport = {};
  _this.addSiteContactField = addSiteContactField;
  _this.removeFromContactsList = removeFromContactsList;
  _this.removeModeOfTransport = removeModeOfTransport;

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

    CreateLocationSvc.getMockModeOfTransport().then(function(modeOfTransportMock){
        _this.location.transportChoices = modeOfTransportMock;
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

  function removeModeOfTransport(modeOfTransportId){
    for(i= 0; i < _this.location.modeOfTransport.length; i++){
      if(_this.location.modeOfTransport[i].id === modeOfTransportId){
        _this.location.modeOfTransport.splice(i, 1);
      }
    }
  }
}
