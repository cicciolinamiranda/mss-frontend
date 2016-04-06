var component = require('./index');

xdescribe("Employee List Service", function() {
  var EmployeeListSvc, $scope;
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
  };
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to EmployeeListSvc
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
      EmployeeListSvc.list().then(function(employees) {
        expect(employees[0].firstname)
          .toBe(sample_employee.firstname);
        done();
      });
      expect(EmployeeListSvc.list).toHaveBeenCalled();
      $scope.$digest();
    });
  });
});
