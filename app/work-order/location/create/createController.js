module.exports = viewCtrl;

var moment = require('moment');

/*@ngInject*/ function viewCtrl(FileUploader) {
var _this = this;
_this.location = {};

//Contact Details
_this.addSiteContactField = addSiteContactField;
_this.removeFromContactsList = removeFromContactsList;

//Barred Employees
_this.addBarredEmployee = addBarredEmployee;
_this.removeBarredEmployee = removeBarredEmployee;
_this.checkBarredSelected = checkBarredSelected;

function init() {
  _this.location.startDate = moment().toDate();
  _this.location.surveyReviewDate = moment().toDate();
  _this.location.locationSurvey = "";
  _this.location.standardOps = "";
  _this.location.locInstructions = "";
  _this.location.healthSafetySurvey = "";
  _this.location.technicalSurvey = "";
  _this.location.floorPlanUploader = new FileUploader();
  _this.location.barredEmployees = [];
  _this.location.siteContactDetails = [];
}

init();

function addBarredEmployee(employee){
  employee.barStartDate = moment().toDate();
  _this.location.barredEmployees.push(employee);
}

function removeBarredEmployee(employee){
  for(i = 0; i < _this.location.barredEmployees.length; i++){
    if(employee.id === _this.location.barredEmployees[i].id){
      _this.location.barredEmployees.splice(i,1);
    }
  }
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
}
