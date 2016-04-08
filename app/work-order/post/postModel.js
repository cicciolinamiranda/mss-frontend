module.exports = function(ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel() {
  var _this = this;

  _this.post = {};

  _this.post.name = '';
  _this.post.isIdentificationRequired = true;
  _this.post.numberOfEmployees = 1;
  _this.post.startTime = moment("09:00", "HH:mm").toDate();
  _this.post.endTime = moment("17:00", "HH:mm").toDate();
  _this.post.hours = moment(_this.post.endTime).diff(moment(_this.post.startTime), 'hours');
  _this.post.chargeRate = 0;
  _this.post.isBookOn = true;
  _this.post.isBookOff = true;
  _this.post.isCallIn = true;
  _this.post.callInFrequency = '';
  _this.post.notes = '';

  return _this;
}
