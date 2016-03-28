var component = require('./index');

describe("Employee View Controller", function() {
  var $controller, $q, $scope;
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
  beforeEach(angular.mock.inject(function(_$controller_, _$q_, $injector){
    $controller = _$controller_;
    $q = _$q_;
    $scope = $injector.get('$rootScope').$new();
  }));

  describe("Employee list", function() {
    it("contains a list of employees resolved by the service", function() {
      var controller = $controller(require('./viewController'), {
        EmployeeViewSvc: mockEmployeeViewSvc,
        $stateParams: {employeeId: sample_employee.id}
      });
      $scope.$digest();
      expect(controller.employee.firstname).toEqual(sample_employee.firstname);
    });
  });
});
