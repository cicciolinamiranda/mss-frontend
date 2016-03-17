module.exports = function(ngModule) {
  ngModule.service('EmployeeRestSvc', restService);
};

restService.$inject = [];

function restService() {
  this.bar = "Hello World";
}
