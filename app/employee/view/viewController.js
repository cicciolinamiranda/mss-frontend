module.exports = viewCtrl;

/*@ngInject*/ function viewCtrl(EmployeeViewSvc, $stateParams) {
  var _this = this;

  function init() {
    EmployeeViewSvc.get($stateParams.employeeId).then(function(employee){
    _this.employee = employee;
    });
  }

  init();
}
