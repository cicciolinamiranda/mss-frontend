var component = require('./index');

describe("Employee List Component", function('GAuth') {
  var $compile, $rootScope;
  var sample_employees = [
    {
      id: '123',
      firstName: 'Auntie',
      lastName: 'Anne'
    },
    {
      id: '124',
      firstName: 'Auntie',
      lastName: 'Walkman'
    },
    {
      id: '125',
      firstName: 'John',
      lastName: 'Canes'
    }
  ];
  
  beforeEach(angular.mock.module(GAuth.name));
  beforeEach(angular.mock.module(component.name));  
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
      // mock $gapi to inject to EmployeeViewSvc
      $provide.service('$gapi', function($q) {
        var gapi = {
          loaded: $q.resolve(),
          load: function() {
            return $q.resolve();
          },
          client: {
            employee: {
              employees: {
                list: function(params) {
                  if (params.q.lower() == 'auntie') {
                    sample_employees.map(function(item) {
                      return item.firstName.lower().startsWith(params.q.lower()) || 
                        item.lastName.lower().startsWith(params.q.lower()) || 
                        item.id.lower().startsWith(params.q.lower());
                    });
                  }
                  return $q.resolve({employees: sample_employees});
                }
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

  it("contains a list of employees resolved by the service", function() {
    var element = $compile("<employee-list></employee-list>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain("Auntie");
    expect(element.html()).toContain("Walkman");
    expect(element.html()).not.toContain("Canes");
  }); 
});
