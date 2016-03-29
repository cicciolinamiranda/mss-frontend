var component = require('./index');
var moment = require('moment');

describe("Create Location Component", function() {
  var scope, controller;
  var siteContactData = [
    {name: "Name1", phone: "Phone1", email: "Email1@email.com", index: 0},
    {name: "Name2", phone: "Phone2", email: "Email2@email.com", index: 1},
    {name: "Name3", phone: "Phone3", email: "Email3@email.com", index: 2}
  ];

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

  it("must have its floor plan uploader initialized", function() {
    expect(controller.location).toBeDefined();
    expect(controller.location.floorPlanUploader).toBeDefined();
  });

  it("must have its site contact details defined on load", function() {
    expect(controller.location).toBeDefined();
    expect(controller.location.siteContactDetails).toBeDefined();
    expect(controller.location.siteContactDetails.length).toEqual(1);
  });

  it("must add another element when addSiteContactField() is called", function(){
    controller.location.siteContactDetails = [];
    controller.location.siteContactDetails = controller.location.siteContactDetails.concat(siteContactData);
    expect(controller.location.siteContactDetails.length).toEqual(3);

    controller.addSiteContactField();
    scope.$apply();

    expect(controller.location.siteContactDetails.length).toEqual(4);
    expect(controller.location.siteContactDetails[3].name).toEqual("");
    expect(controller.location.siteContactDetails[3].index).toEqual(3);
  })

  it("must remove another element when removeFromContactsList() is called", function(){
    controller.location.siteContactDetails = [];
    controller.location.siteContactDetails = controller.location.siteContactDetails.concat(siteContactData);
    controller.location.siteContactDetails = siteContactData;
    expect(controller.location.siteContactDetails.length).toEqual(3);

    controller.removeFromContactsList(1);
    scope.$apply();

    expect(controller.location.siteContactDetails.length).toEqual(2);
    expect(controller.location.siteContactDetails[1].name).toEqual("Name3");
    expect(controller.location.siteContactDetails[1].index).toEqual(1);

  })



});
