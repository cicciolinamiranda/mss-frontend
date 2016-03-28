var component = require('./index');
var moment = require('moment');

describe("Create Location Component", function() {
  var scope, controller;

  beforeEach(angular.mock.module(component.name));
  beforeEach(angular.mock.inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    var element = angular.element('<location-create></location-create>');
    $compile(element)(scope);
    scope.$apply();

    controller = element.controller('locationCreate');
  }));

  it("must have its start date initialized to current date", function() {
    expect(controller.location).toBeDefined();
    expect(moment(controller.location.startDate).diff(moment(), 'days')).toBe(0);
  });
});
