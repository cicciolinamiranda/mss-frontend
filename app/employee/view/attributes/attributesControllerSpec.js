var component = require('./index');

describe("License Controller", function() {
  var $controller, $q, $rootScope;
  var sample_employee = {
    id: '123',
    firstname: 'Auntie',
    surname: 'Anne'
  };
  var sample_attrib = {
    type: 'Skill',
    description: 'Amazon Trained',
    issueDate: '2/27/2015',
    expiryDate: '2/26/2017'
  };
  var mockAttributesSvc = {
    getAttributes: function(id) {
      if (id === '123') {
        return $q.resolve({attributes: [sample_attrib]});
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

  describe("Get attributes of an employee", function() {
    it("should contain list of attributes", function() {
      var controller = $controller(require('./attributesController'), {
        AttributesSvc: mockAttributesSvc
      }, { employee: sample_employee.id });
      $rootScope.$digest();
      expect(controller.attributesList.attributes[0].description).toEqual(sample_attrib.description);
    });
  });
});
