var component = require('./index');

describe("Attributes Service", function() {
  var AttributesSvc, $rootScope;
  // since $gapi already injects $q,
  // it will be implicitly injected to the service
  var sample_employee = {
    personGUID: '123',
    firstName: 'Auntie',
    lastName: 'Anne'
  };
  var sample_attrib = {
    type: 'Skill',
    description: 'Amazon Trained',
    issueDate: '2/27/2015',
    expiryDate: '2/26/2017'
  };
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to AttributesSvc
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
              attributes: {
                listByEmployeeId: function(params) {
                  if (params.employeeId === '123') {
                    return $q.resolve({attributes: [sample_attrib]});
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
  beforeEach(angular.mock.inject(function(_AttributesSvc_, _$rootScope_){
    AttributesSvc = _AttributesSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(AttributesSvc, 'getAttributes').and.callThrough();
  });

  describe("Get licenses of an employee", function() {
    it("should return a promise that contains list of licenses when resolved", function(done) {
      AttributesSvc.getAttributes('123').then(function(attributes) {
        expect(attributes.attributes[0].description).toBe(sample_attrib.description);
        done();
      });
      expect(AttributesSvc.getAttributes).toHaveBeenCalledWith('123');
      $rootScope.$digest();
    });
  });
});
