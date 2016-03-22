var component = require('./index');

describe("Employee View Service", function() {
  var EmployeeViewSvc, $scope;
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
  };
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to EmployeeViewSvc
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
              employees: {
                get: function(params) {
                  if (params.id === '123') {
                    return $q.resolve(sample_employee);
                  } else {
                    return $q.reject('Employee not found');
                  }
                }
              }
            }
          }
        };
        return gapi;
      });
    });
  });
  beforeEach(angular.mock.inject(function(_EmployeeViewSvc_, $injector){
    EmployeeViewSvc = _EmployeeViewSvc_;
    $scope = $injector.get('$rootScope').$new();
  }));
  beforeEach(function() {
    spyOn(EmployeeViewSvc, 'get').and.callThrough();
  });

  describe("Get employee", function() {
    it("returns a promise that resolves with employee data", function(done) {
      EmployeeViewSvc.get('123').then(function(employee) {
        expect(employee.firstname).toBe(sample_employee.firstname);
        done();
      });
      expect(EmployeeViewSvc.get).toHaveBeenCalledWith('123');
      $scope.$digest();
    });
  });
});
