var component = require('./index');

describe("Employee View Component", function() {
  var $compile, $rootScope;
  var sample_contractedHour = {
    contractHourPeriod: 'Weekly',
    contractHourThreshold: '40',
    contractDays: '5'
  };
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
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
              contractedHours: {
                listByEmployeeId: function(params) {
                  if (params.id === '123') {
                    return $q.resolve(sample_contractedHour);
                  } else {
                    return $q.reject('Employee not found');
                  }
              },
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
      $provide.value('$stateParams', {
        employeeId: sample_employee.id
      });
    });
  });
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it("contains a list of employees resolved by the service", function() {
    var element = $compile("<employee-view></employee-view>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain("Auntie");
  });
});
