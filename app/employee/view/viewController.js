module.exports = viewCtrl;

function viewCtrl(EmployeeSvc, $stateParams) {
  "ngInject";
  var _this = this;

  function init(){
  	EmployeeSvc.get($stateParams.employeeId).then(function(employee){
  		_this.employee = employee;
  	});
  }

  init();
}
