module.exports = listCtrl;

/*@ngInject*/ function listCtrl(EmployeeListSvc, $stateParams) {
  var _this = this;

  _this.isSearch = !!$stateParams.searchTerm;
  _this.searchTerm = $stateParams.searchTerm;

  function init() {
    EmployeeListSvc.list({q: $stateParams.searchTerm}).then(function(employees){
      _this.employees = employees;
    });
  }

  init();
}
