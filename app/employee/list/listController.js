module.exports = listCtrl;

function listCtrl(EmployeeSvc) {
  "ngInject";
  var vm = this;

  function init(){
    EmployeeSvc.list().then(function(employees){
      vm.employees = employees;
    });
  }

  init();
}
