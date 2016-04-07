var component = require('./index');

describe("Pay Info Service", function() {
  var PayInfoSvc, $rootScope;
  var sample_employee = {
    id: '123',
    contractHourPeriod: 'Weekly',
    contractHourThreshold: '40',
    contractDays: '5'
  };

  var sample_payRates={
    id: '123',
    rateCurrency: 'USD',
    rate: '91.10235'
  }
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to PayInfoSvc
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
                  if (params.employeeId === '123') {
                    return $q.resolve(sample_employee);
                  } else {
                    return $q.reject('contracted hours not found');
                  }
                }
              },
              payRates: {
                listByEmployeeId: function(params) {
                  if (params.employeeId === '123') {
                    return $q.resolve(sample_employee);
                  } else {
                    return $q.reject('payRates not found');
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
  beforeEach(angular.mock.inject(function(_PayInfoSvc_, _$rootScope_){
    PayInfoSvc = _PayInfoSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(PayInfoSvc, 'getEmployeeContractedHours').and.callThrough();
    spyOn(PayInfoSvc, 'getPayRates').and.callThrough();

  });

  describe("Get employee", function() {
    it("returns a promise that resolves with employee contracted hours data", function(done) {
      PayInfoSvc.getEmployeeContractedHours('123').then(function(employee) {
        expect(employee.contractHourPeriod).toBe(sample_employee.contractHourPeriod);
        done();
      });

      PayInfoSvc.getPayRates('123').then(function(PayRates){
        expect(payRates.rateCurrency).toBe(sample_employee.rateCurrency);
        done();
      });

      expect(PayInfoSvc.getPayRates).toHaveBeenCalledWith('123');
      expect(PayInfoSvc.getEmployeeContractedHours).toHaveBeenCalledWith('123');
      $rootScope.$digest();
    });
  });
});
