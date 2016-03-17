module.exports = function(ngModule) {
  ngModule.controller('EmployeeListCtrl', listCtrl);
};

function listCtrl(EmployeeRestSvc) {
  "ngInject";
  this.foo = EmployeeRestSvc.bar;
}
