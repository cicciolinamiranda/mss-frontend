module.exports = function(ngModule) {
  ngModule.controller('EmployeeViewCtrl', viewCtrl);
};

function viewCtrl(EmployeeSvc, $stateParams) {
  "ngInject";
  var vm = this;

  function init(){
  	EmployeeSvc.get($stateParams.employeeId).then(function(employee){
  		vm.employee = employee;
  	});
  }

  init();
}
