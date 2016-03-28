module.exports = viewCtrl;

var moment = require('moment');

function viewCtrl() {
  "ngInject";
  var _this = this;
  _this.location = {};

  function init() {
    console.log("DAWI!");
  	_this.location.startDate = moment().toDate();
  }

  init();
}
