var component = require('./index');

describe("Employee List Service", function('GAuth') {
  var EmployeeListSvc, $scope;
  // since $gapi already injects $q,
  // it will be implicitly injected to the service
  var FILTER_ALL = { q:"" };
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };

  beforeEach(angular.mock.module(GAuth.name));
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to EmployeeListSvc
  beforeEach(function() {
    angular.mock.module(function($provide) {      
      $provide.service('GAuth', function () {
        return {
          protect: function(f) {
            return f;
          }
        };        
      });
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
                list: function() {
                  return $q.resolve({employees: [sample_employee]});
                }
              }
            }
          }
        };
        return gapi;
      });
    });
  });

  beforeEach(angular.mock.inject(function(_EmployeeListSvc_, $injector){
    EmployeeListSvc = _EmployeeListSvc_;
    $scope = $injector.get('$rootScope').$new();
  }));


  beforeEach(function() {
    spyOn(EmployeeListSvc, 'list').and.callThrough();
  });

  describe("List employees", function() {
    it("returns a promise that resolves with list of employees", function(done) {
      EmployeeListSvc.list(FILTER_ALL).then(function(employees) {
        expect(employees[0].firstname)
          .toBe(sample_employee.firstname);
        done();
      });
      expect(EmployeeListSvc.list).toHaveBeenCalled();
      $scope.$digest();
    });
  });
});
