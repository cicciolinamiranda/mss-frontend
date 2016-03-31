module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl(FileUploader, CreateLocationSvc) {
  var _this = this;
  _this.location = {};
  _this.mapSource;

  function init() {
    _this.location.id = "001201";
    _this.location.latitude = "14.557720";
    _this.location.longitude = "-121.021624";
    _this.location.address = "Philamlife Tower"
    _this.location.startDate = moment().toDate();
    _this.location.endDate = moment().toDate();
    _this.mapSource = "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=2000x200&markers="
      + _this.location.latitude + "," + _this.location.longitude;
  }

  init();

}
