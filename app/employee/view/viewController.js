module.exports = viewCtrl;

/*@ngInject*/ function viewCtrl(EmployeeViewSvc, $stateParams) {
  var _this = this;
  _this.employeeId = $stateParams.employeeId;

  function init() {
    EmployeeViewSvc.get($stateParams.employeeId).then(function(employee){
    _this.employee = employee;
    });
  }

  init();
}
