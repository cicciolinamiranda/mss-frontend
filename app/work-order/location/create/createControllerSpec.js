var component = require('./index');
var moment = require('moment');
require('../../index');

xdescribe("Create Location Component", function() {
  var scope, controller, createService, LocationModel, test, stateParams;
  var siteContactData = [
    {siteLocationName: "Name1", contactNumber: "Phone1", siteLocationEmail: "Email1@email.com", index: 0},
    {siteLocationName: "Name2", contactNumber: "Phone2", siteLocationEmail: "Email2@email.com", index: 1},
    {siteLocationName: "Name3", contactNumber: "Phone3", siteLocationEmail: "Email3@email.com", index: 2}
  ];
  var modeOfTransport = [
    {"id": 1, "transportName": "Van", "billed": false, "costTypeId": ""},
    {"id": 2, "transportName": "Private Jet", "billed": false, "costTypeId": "" },
    {"id": 3, "transportName": "Armored Van", "billed": false, "costTypeId": ""}
  ];
  var searchMoTResponse = [
    {"id": 1, "transportName": "Van", "billed": false, "costTypeId": ""},
    {"id": 3, "transportName": "Armored Van", "billed": false, "costTypeId": ""}
  ];
  var siteSkills = [
    { "id": 1, "skillName": "Guarding"},
    { "id": 2, "skillName": "Self Defence"},
    { "id": 3, "skillName": "Multilingual"}
  ];
  var protectiveEquip = [
    { "id": 1, "equipmentName": "Kevlar Vest", "billed": false, "costTypeId": ""},
    { "id": 2, "equipmentName": "Helmet", "billed": false, "costTypeId": ""},
    { "id": 3, "equipmentName": "Bulletproof Vest", "billed": false, "costTypeId": ""}
  ];

  beforeEach(angular.mock.module(component.name));

  //TODO: I think this is unclean, investigate later.
  beforeEach(angular.mock.module(function($provide) {
    $provide.value('$stateParams', {
      workOrderId: 1
    });
  }));

  beforeEach(angular.mock.module(function($provide) {
    $provide.provider('$state', function () {
          return {
              $get: function () {
                  return {
                      params: {id:1}
                  };
              }
          };
      });
      $provide.constant('WORKORDER_GAPI_BASE', '');
  }));

  beforeEach(angular.mock.inject(function($rootScope, $compile, $injector, $q, _LocationModel_){
    createService = $injector.get('CreateLocationSvc');
     LocationModel = _LocationModel_;
    stateParams = $injector.get('$stateParams');

    scope = $rootScope.$new();

    spyOn(createService, 'searchMockModeOfTransport').and.returnValue(
      $q.when(searchMoTResponse));

    spyOn(createService, 'searchSiteSkills').and.returnValue(
      $q.when(siteSkills));

    spyOn(createService, 'searchProtectiveEquipment').and.returnValue(
      $q.when(protectiveEquip));

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

  it("must add another element when addSiteContactField() is called", function(){
    controller.location.siteContactDetails = [];
    controller.location.siteContactDetails = controller.location.siteContactDetails.concat(siteContactData);
    expect(controller.location.siteContactDetails.length).toEqual(3);

    controller.addSiteContactField();
    scope.$apply();

    expect(controller.location.siteContactDetails.length).toEqual(4);
    expect(controller.location.siteContactDetails[3].siteLocationName).toEqual("");
    expect(controller.location.siteContactDetails[3].index).toEqual(3);
  })

  it("must remove another element when removeFromContactsList() is called", function(){
    controller.location.siteContactDetails = [];
    controller.location.siteContactDetails = controller.location.siteContactDetails.concat(siteContactData);
    expect(controller.location.siteContactDetails.length).toEqual(3);

    controller.removeFromContactsList(1);
    scope.$apply();

    expect(controller.location.siteContactDetails.length).toEqual(2);
    expect(controller.location.siteContactDetails[1].siteLocationName).toEqual("Name3");
    expect(controller.location.siteContactDetails[1].index).toEqual(1);

  })

  it("must remove an element when removeFromArray() is called", function(){
    controller.location.modeOfTransport = [];
    controller.location.modeOfTransport = controller.location.modeOfTransport.concat(modeOfTransport);
    expect(controller.location.modeOfTransport.length).toEqual(3);

    controller.removeFromArray(controller.location.modeOfTransport, 1);
    scope.$apply();

    expect(controller.location.modeOfTransport.length).toEqual(2);
  })

  it("must add another item when addToArray() is called", function(){
    controller.location.siteSkills = [{ "id": 1, "skillName": "Guarding"}];
    expect(controller.location.siteSkills.length).toEqual(1);

    controller.addToArray(controller.location.siteSkills, { "id": 2, "skillName": "Self Defense"});
    scope.$apply();

    expect(controller.location.siteSkills.length).toEqual(2);
  })

  it("must return filtered list when refreshMotSearch() is called", function(){
    controller.refreshMotSearch("van");
    scope.$apply();
    expect(controller.transportChoices.length).toEqual(2);
  })

  //TODO: Barred Employee Specs
});
