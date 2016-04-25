var component = require('./index');

describe("System Role Component", function() {
  var $compile, $rootScope;
  var sample_contractedHour = {
    contractHourPeriod: 'Weekly',
    contractHourThreshold: '40',
    contractDays: '5'
  };
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };

  var sample_systemRole = {
    id: '123',
    role: 'Admin'
  }

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
            Employee: {
              systemRole: {
                getAllSystemRole: function() {
                    return $q.resolve(sample_systemRole);
              }
            }
          }
        };
        return gapi;
      });
    });
  });
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it("contains a list of System Roles", function() {
    var element = $compile("<role-list</role-list>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain("Admin");
  });
});
