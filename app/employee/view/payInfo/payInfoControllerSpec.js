var component = require('./index');

describe("Pay Info Controller", function() {
  var $controller, $q, $rootScope;
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };
  var sample_contractedHours = {
    contractHourPeriod: 'Weekly',
    contractHourThreshold: '40',
    contractDays: '5'
  };
  var sample_payRate = {
    rateCurrency: 'EUR',
    rate: '14.816716'
  };
  var mockPayInfoSvc = {
    getEmployeeContractedHours: function(id) {
      if (id === '123') {
        return $q.resolve({employeeContractedHours: [sample_contractedHours]});
      } else {
        return $q.reject('Employee not found');
      }
    },
    getPayRates: function(id) {
      if (id === '123') {
        return $q.resolve({employeePayRates: [sample_payRate]});
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

  describe("Get pay info of an employee", function() {
    it("should contain list of pay info", function() {
      var controller = $controller(require('./payInfoController'), {
        PayInfoSvc: mockPayInfoSvc
      }, { employee: sample_employee.personGUID });
      $rootScope.$digest();
      expect(controller.employeeContractedHours.employeeContractedHours[0].contractHourThreshold)
        .toEqual(sample_contractedHours.contractHourThreshold);
      expect(controller.employeePayRates.employeePayRates[0].rate)
        .toEqual(sample_payRate.rate);
    });
  });
});
