var component = require('./index');

describe("Employee Lookup Service", function() {
  var EmployeeLookupSvc, $scope;
  var employees = [
    {
      id: '123',
      firstname: 'John',
      surname: 'Doe'
    },
    {
      id: '456',
      firstname: 'Peter',
      surname: 'Parker'
    },
  ];
  beforeEach(angular.mock.module(component.name));
  // mock $gapi to inject to EmployeeListSvc
  beforeEach(function($httpBackend) {
    $httpBackend
      .when('GET', '/employees')
      .respond(employees);
  });
  //TODO: Employee Lookup Service Specs
});
