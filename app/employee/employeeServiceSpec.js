var app = require('./index');

describe("Employee Service", function() {
  var EmployeeSvc, Employee, $scope;
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
  };
  beforeEach(angular.mock.module(app.name));
  // mock EmployeeRest to inject to EmployeeSvc
  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.service('EmployeeRest', function($q) {
        return {
          listEmployees: function() {
            return $q.resolve({employees: [sample_employee]});
          },
          getEmployee: function(id) {
            if (id === '123') {
              return $q.resolve(sample_employee);
            } else {
              return $q.reject('Employee not found');
            }
          }
        };
      });
    });
  });
  beforeEach(angular.mock.inject(function(_EmployeeSvc_, _Employee_, $injector){
    EmployeeSvc = _EmployeeSvc_;
    Employee = _Employee_;
    $scope = $injector.get('$rootScope').$new();
  }));
  beforeEach(function() {
    spyOn(EmployeeSvc, 'list').and.callThrough();
    spyOn(EmployeeSvc, 'get').and.callThrough();
  });

  describe("List employees", function() {
    it("returns a promise that resolves with an array of employees", function(done) {
      EmployeeSvc.list().then(function(employees) {
        expect(employees[sample_employee.id].firstname)
          .toBe((new Employee(sample_employee)).firstname);
        done();
      });
      expect(EmployeeSvc.list).toHaveBeenCalled();
      $scope.$digest();
    });
  });

  describe("Get employee", function() {
    it("returns a promise that resolves with an employee object", function(done) {
      EmployeeSvc.get('123').then(function(employee) {
        expect(employee.firstname).toBe(sample_employee.firstname);
        done();
      });
      expect(EmployeeSvc.get).toHaveBeenCalledWith('123');
      $scope.$digest();
    });
  });
});
