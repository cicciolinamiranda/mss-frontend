module.exports = viewCtrl;

function viewCtrl(EmployeeViewSvc, $stateParams) {
  "ngInject";
  var _this = this;

  function init() {
  	EmployeeViewSvc.get($stateParams.employeeId).then(function(employee){
  		_this.employee = employee;
  	});
  }

  init();
}
