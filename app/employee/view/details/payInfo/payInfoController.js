module.exports = payInfoCtrl;

function payInfoCtrl(PayInfoSvc) {

  var _this = this;

  function init() {
    console.log("payInfoCtrl:"+ this.employeeId);

  	PayInfoSvc.getEmployeeContractedHours("1054287114").then(function(employeeContractedHours){

  		_this.employeeContractedHours = employeeContractedHours;
  		console.log(_this.employeeContractedHours);
  	});
  }

  init();
}