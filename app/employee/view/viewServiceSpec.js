var component = require('./index');

describe("Employee View Service", function() {
  var EmployeeViewSvc, $rootScope;
  // since $gapi already injects $q,
  // it will be implicitly injected to the service
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to EmployeeViewSvc
  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.constant('EMPLOYEE_GAPI_BASE', '');
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
  beforeEach(angular.mock.inject(function(_EmployeeViewSvc_, _$rootScope_){
    EmployeeViewSvc = _EmployeeViewSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(EmployeeViewSvc, 'get').and.callThrough();
  });

  describe("Get employee", function() {
    it("returns a promise that resolves with employee data", function(done) {
      EmployeeViewSvc.get('123').then(function(employee) {
        expect(employee.firstName).toBe(sample_employee.firstName);
        done();
      });
      expect(EmployeeViewSvc.get).toHaveBeenCalledWith('123');
      $rootScope.$digest();
    });
  });
});
