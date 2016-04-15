var component = require('./index');

describe("Employee View Controller", function() {
  var $controller, $q, $rootScope;
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };
  var mockEmployeeViewSvc = {
    get: function(id) {
      if (id === '123') {
        return $q.resolve(sample_employee);
      } else {
        return $q.reject('Employee not found');
      }
    }
  };

  beforeEach(angular.mock.module(component.name));
  beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_){
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  describe("Employee list", function() {
    it("contains a list of employees resolved by the service", function() {
      var controller = $controller(require('./viewController'), {
        EmployeeViewSvc: mockEmployeeViewSvc,
        $stateParams: {employeeId: sample_employee.personGUID}
      });
      $rootScope.$digest();
      expect(controller.employee.firstName).toEqual(sample_employee.firstName);
    });
  });
});
