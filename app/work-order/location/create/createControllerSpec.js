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

  it("must have its link type input fields undefined on page load", function() {
    expect(controller.location).toBeDefined();
    expect(controller.location.locationSurvey).toEqual('');
    expect(controller.location.standardOps).toEqual('');
    expect(controller.location.locInstructions).toEqual('');
    expect(controller.location.healthSafetySurvey).toEqual('');
    expect(controller.location.technicalSurvey).toEqual('');
  });

  it("must have its survey review date initialized to current date", function() {
    expect(controller.location).toBeDefined();
    expect(moment(controller.location.surveyReviewDate).diff(moment(), 'days')).toBe(0);
  });

  it("must have its survey review date initialized to current date", function() {
    expect(controller.location).toBeDefined();
    expect(controller.location.floorPlanUploader).toBeDefined();
  });
});
