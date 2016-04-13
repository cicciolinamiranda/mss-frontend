module.exports = listCtrl;

/*@ngInject*/ function listCtrl(EmployeeListSvc, $stateParams) {
  var _this = this;

  function init() {
    EmployeeListSvc.list({q: $stateParams.searchTerm}).then(function(employees){
      _this.employees = employees;
    });
  }

  init();
}
