var component = require('./index');
var moment = require('moment');

describe("View Location Component", function() {
    var scope, controller, viewService, state;
    var mockLocData =[
      {
        "id": 1,
        "latitude": "14.557606",
        "longitude": "121.021624",
        "address": "Paseo de Roxas, Makati, NCR",
        "startDate": "5/5/16",
        "endDate": "6/6/15",
        "siteContactDetails": [
        ],
        "protectiveEquipment": [
          {
            "equipmentName": "Bulletproof Vest",
            "id": 1,
            "billed": true,
            "costType": "ONE_OFF_COST"
          },
          {
            "equipmentName": "Kevlar Vest",
            "id": 3,
            "billed": false
          }
        ],
        "modeOfTransport": [
          {
            "transportName": "Private Van",
            "id": 1,
            "billed": true,
            "costType": "ONE_OFF_COST"
          },
          {
            "transportName": "Battle Ship",
            "id": 4,
            "billed": false
          }
        ],
        "barredEmployees": [
        ],
        "siteSkills": [
          { "id": 1, "skillName": "Guarding"},
          { "id": 2, "skillName": "Self Defence"}
        ],
        "healthSafetySurvey": "",
        "technicalSurvey": "http://google.com",
        "locationSurvey": "http://google.com",
        "floorPlan": "http://google.com",
        "locationInstructionApproval": "http://google.com",
        "sop": "http://google.com"
      }
    ];

    beforeEach(angular.mock.module(component.name));

    beforeEach(angular.mock.module(function($provide) {
      $provide.provider('$state', function () {
            return {
                $get: function () {
                    return {
                        params: {}
                    };
                }
            };
        });
    }));

    beforeEach(angular.mock.inject(function($rootScope, $compile, $injector, $q){
      viewService = $injector.get('ViewLocationSvc');
      state = $injector.get('$state');

      scope = $rootScope.$new();

      spyOn(viewService, 'getBilledCostType').and.returnValue(
        $q.when({ "id": "ONE_OFF_COST", "name": "One-off Cost"}));

      state.params = { id: 1 };
      spyOn(viewService, 'getLocationDetails').and.returnValue(
        $q.when(mockLocData));

      var element = angular.element('<location-view></location-view>');
      $compile(element)(scope);
      scope.$apply();

      controller = element.controller('locationView', { ViewLocationSvc:viewService, $stateParams:state.params});
    }));

    //TODO Tests


});
