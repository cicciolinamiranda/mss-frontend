module.exports = function(ngModule) {
  ngModule.controller('ViewEmployeeCtrl', viewCtrl);
};

function viewCtrl(EmployeeSvc,$routeParams) {
  "ngInject";
  var vm = this;

  function init(){
  	var id = $routeParams.id;
  	EmployeeSvc.get(id).then(function(employee){
		vm.employee = employee;
	});
    // EmployeeSvc.list().then(function(employees){
    //   vm.employees = employees;
    // });
  }

  init();
}
