module.exports = viewCtrl;

function viewCtrl(EmployeeViewSvc, $stateParams) {
  "ngInject";
  var _this = this;

  function init() {
  	EmployeeViewSvc.get($stateParams.employeeId).then(function(employee){
  		_this.employee = employee;
  	});

  	EmployeeViewSvc.getEmployeeContractedHours($stateParams.employeeId).then(function(employeeContractedHours){
  		_this.employeeContractedHours = employeeContractedHours;
  		console.log(_this.employeeContractedHours.employeeContractedHours[0]);
  	});
  }

  init();
}