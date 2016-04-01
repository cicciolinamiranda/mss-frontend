module.exports = payInfoCtrl;

/*@ngInject*/function payInfoCtrl(PayInfoSvc, $scope) {

  var _this = this;
  console.log(_this);
  function init() {
    console.log("payInfoCtrl:"+ $scope.employeeid);

  	PayInfoSvc.getEmployeeContractedHours("1054287114").then(function(employeeContractedHours){

  		_this.employeeContractedHours = employeeContractedHours;
  		console.log(_this.employeeContractedHours);
  	});
  }

  init();
}