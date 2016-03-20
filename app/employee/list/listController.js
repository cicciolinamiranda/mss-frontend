module.exports = listCtrl;

function listCtrl(EmployeeSvc) {
  "ngInject";
  var _this = this;

  function init(){
    EmployeeSvc.list().then(function(employees){
      _this.employees = employees;
    });
  }

  init();
}
