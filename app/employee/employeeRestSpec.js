var app = require('./index');

describe("Employee Rest Service", function() {
  var EmployeeRest, $scope;
  var sample_employee = {
    id: '123',
    firstname: '',
    surname: ''
  };
  beforeEach(angular.mock.module(app.name));
  // mock $gapi to inject to EmployeeRest
  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.service('$gapi', function($q) {
        var gapi = {
          loaded: $q.resolve(),
          load: function() {
            return $q.resolve();
          },
          client: {
            employee: {
              employees: {}
            }
          }
        };
        gapi.client.employee.employees = {
          list: function() {
            return $q.resolve({
              employees: [sample_employee]});
          },
          get: function(params) {
            if (params.id === '123') {
              return $q.resolve(sample_employee);
            } else {
              return $q.reject('Employee not found');
            }
          }
        };
        return gapi;
      });
    });
  });
  beforeEach(angular.mock.inject(function(_EmployeeRest_, $injector){
    EmployeeRest = _EmployeeRest_;
    $scope = $injector.get('$rootScope').$new();
  }));
  beforeEach(function() {
    spyOn(EmployeeRest, 'listEmployees').and.callThrough();
    spyOn(EmployeeRest, 'getEmployee').and.callThrough();
  });

  describe("List employees", function() {
    it("returns a promise that resolves with list of employees", function(done) {
      EmployeeRest.listEmployees().then(function(data) {
        expect(data.employees[0]).toBe(sample_employee);
        done();
      });
      expect(EmployeeRest.listEmployees).toHaveBeenCalled();
      $scope.$digest();
    });
  });

  describe("Get employee", function() {
    it("returns a promise that resolves with employee data", function(done) {
      EmployeeRest.getEmployee('123').then(function(data) {
        expect(data.firstname).toBe(sample_employee.firstname);
        done();
      });
      expect(EmployeeRest.getEmployee).toHaveBeenCalledWith('123');
      $scope.$digest();
    });
  });
});
