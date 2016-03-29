module.exports = viewCtrl;

var moment = require('moment');

function viewCtrl(FileUploader) {
  "ngInject";
  var _this = this;
  _this.location = {
    siteContactDetails: [
      {name: "", phone: "", email: "", index: 0}
    ]
  };

  _this.addSiteContactField = addSiteContactField;
  _this.removeFromContactsList = removeFromContactsList;

  function init() {
  	_this.location.startDate = moment().toDate();
    _this.location.surveyReviewDate = moment().toDate();
    _this.location.locationSurvey = "";
    _this.location.standardOps = "";
    _this.location.locInstructions = "";
    _this.location.healthSafetySurvey = "";
    _this.location.technicalSurvey = "";
    _this.location.floorPlanUploader = new FileUploader();
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
}
