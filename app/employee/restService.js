module.exports = function(ngModule) {
  ngModule.service('EmployeeRestSvc', restService);
};

function restService() {
  "ngInject";
  this.bar = "Hello World";
}
