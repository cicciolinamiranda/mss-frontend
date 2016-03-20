var app = require('./index');

describe("Employee Service", function() {
  var EmployeeSvc;
  beforeEach(angular.mock.module(app.name));
  beforeEach(angular.mock.inject(function(_EmployeeSvc_){
    EmployeeSvc = _EmployeeSvc_;
  }));

  describe("List employees", function() {
    it("returns a promise that resolves with an array of employees", function() {
      //
    });
  });

  describe("Get employee", function() {
    it("returns a promise that resolves with an employee object", function() {
      //
    });
  });
});
