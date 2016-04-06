var component = require('./index');

xdescribe("Employee View Controller", function() {
  var $controller, $q, $rootScope;
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
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
        $stateParams: {employeeId: sample_employee.id}
      });
      $rootScope.$digest();
      expect(controller.employee.firstname).toEqual(sample_employee.firstname);
    });
  });
});
