module.exports = function(ngModule) {
  ngModule.controller('EmployeeListCtrl', listCtrl);
};

listCtrl.$inject = [
  'EmployeeRestSvc'
];

function listCtrl(EmployeeRestSvc) {
  this.foo = EmployeeRestSvc.bar;
}
