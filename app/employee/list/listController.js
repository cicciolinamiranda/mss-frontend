module.exports = listCtrl;

/*@ngInject*/ function listCtrl(EmployeeListSvc) {
  var _this = this;

  function init() {
    EmployeeListSvc.list().then(function(employees){
      _this.employees = employees;
    });
  }

  init();
}
