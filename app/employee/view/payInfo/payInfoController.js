module.exports = payInfoCtrl;

/*@ngInject*/function payInfoCtrl(PayInfoSvc) {
  var _this = this;
  function init() {
  	PayInfoSvc.getEmployeeContractedHours(_this.employee).then(function(employeeContractedHours){
  		_this.employeeContractedHours = employeeContractedHours;
  	});

    PayInfoSvc.getPayRates(_this.employee).then(function(employeePayRates){
      _this.employeePayRates = employeePayRates;
    });
  }

  init();
}