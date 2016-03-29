module.exports = viewCtrl;

var moment = require('moment');

/*@ngInject*/ function viewCtrl() {
  var _this = this;
  _this.location = {};

  function init() {
    _this.location.startDate = moment().toDate();
    _this.location.surveyReviewDate = moment().toDate();
    _this.location.locationSurvey = "";
    _this.location.standardOps = "";
    _this.location.locInstructions = "";
    _this.location.healthSafetySurvey = "";
    _this.location.technicalSurvey = "";
  }

  init();
}
