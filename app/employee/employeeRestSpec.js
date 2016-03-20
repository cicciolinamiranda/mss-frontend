var app = require('./index');

describe("Employee Rest", function() {
  var EmployeeRest;
  beforeEach(angular.mock.module(app.name));
  beforeEach(angular.mock.inject(function(_EmployeeRest_){
    EmployeeRest = _EmployeeRest_;
  }));

  describe("List employees", function() {
    it("returns a promise that resolves with list of employees", function() {
      //
    });
  });

  describe("Get employee", function() {
    it("returns a promise that resolves with employee data", function() {
      //
    });
  });
});
