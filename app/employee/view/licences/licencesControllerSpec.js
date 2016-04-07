var component = require('./index');

describe("License Controller", function() {
  var $controller, $q, $rootScope;
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
  };
  var sample_license = {
    category: 'Fresh Talent',
    type: 'Visa',
    licenceNumber: 'EM091723/16',
    issueDate: '16/04/1998',
    expiryDate: '06/05/2040'
  };
  var mockLicencesSvc = {
    getLicences: function(id) {
      if (id === '123') {
        return $q.resolve({licences: [sample_license]});
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

  describe("Get licenses of an employee", function() {
    it("should return a promise that contains list of licenses when resolved", function() {
      var controller = $controller(require('./licencesController'), {
        LicencesSvc: mockLicencesSvc
      }, { employee: sample_employee.id });
      $rootScope.$digest();
      expect(controller.licences.licences[0].licenceNumber).toEqual(sample_license.licenceNumber);
    });
  });
});
