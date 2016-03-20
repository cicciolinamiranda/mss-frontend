module.exports = listCtrl;

function listCtrl(EmployeeListSvc) {
  "ngInject";
  var _this = this;

  function init() {
    EmployeeListSvc.list().then(function(employees){
      _this.employees = employees;
    });
  }

  init();
}
