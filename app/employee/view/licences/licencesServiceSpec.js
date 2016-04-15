var component = require('./index');

describe("License Service", function() {
  var LicencesSvc, $rootScope;
  // since $gapi already injects $q,
  // it will be implicitly injected to the service
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };
  var sample_license = {
    category: 'Fresh Talent',
    type: 'Visa',
    licenceNumber: 'EM091723/16',
    issueDate: '16/04/1998',
    expiryDate: '06/05/2040'
  };
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to LicencesSvc
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
              licences: {
                listByEmployeeId: function(params) {
                  if (params.employeeId === '123') {
                    return $q.resolve({licences: [sample_license]});
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
    });
  });
  beforeEach(angular.mock.inject(function(_LicencesSvc_, _$rootScope_){
    LicencesSvc = _LicencesSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(LicencesSvc, 'getLicences').and.callThrough();
  });

  describe("Get licenses of an employee", function() {
    it("should return a promise that contains list of licenses when resolved", function(done) {
      LicencesSvc.getLicences('123').then(function(licences) {
        expect(licences.licences[0].licenceNumber).toBe(sample_license.licenceNumber);
        done();
      });
      expect(LicencesSvc.getLicences).toHaveBeenCalledWith('123');
      $rootScope.$digest();
    });
  });
});
