var component = require('./index');

describe("View Location Component", function() {
    var scope, controller, viewService, state, stateParam,gapi,$timeout;
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

    var mockViewLocationService = {
      get: function(id) {
        if (id === '1') {
          return $q.resolve(mockLocData);
        } else {
          return $q.reject('Employee not found');
        }
      }
    };

    beforeEach(angular.mock.module(component.name));
    // mock $gapi to inject ViewLocationSvc
    beforeEach(function() {
      angular.mock.module(function($provide) {
        $provide.service('$gapi', function($q) {
          var gapi = {
            loaded: $q.resolve(),
            load: function() {
              return $q.resolve();
            },
            client: {
              workorder: {
                customer:{
                location:{
                  get: function(params) {
                    if (params.id === '1') {
                      return $q.resolve(mockLocData);
                    } else {
                      return $q.reject('Employee not found');
                    }
                  }
                }
                }
              }
            }
          };
          return gapi;
        });
        $provide.constant('GAPI_BASE', '');
        $provide.constant('MOCK_BASE', '');
      });
    });
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('$stateParams', {
        id: 1
      });
    }));
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

    beforeEach(inject(function($rootScope, _$componentController_, $q, $injector) {
        viewService = $injector.get('ViewLocationSvc');
        spyOn(viewService, 'getBilledCostType').and.returnValue(
            $q.when({ "id": "ONE_OFF_COST", "name": "One-off Cost"}));

        spyOn(viewService, 'getLocationDetails').and.returnValue(
          $q.when(mockLocData));

        state = $injector.get('$state');
        stateParam = $injector.get('$stateParams');
        gapi = $injector.get('$gapi');

        scope = $rootScope.$new();
        controller = _$componentController_;
    }));


    it('must ensure the correct parameter is passed', function() {
       var ctrl = controller('locationView', {$scope:scope,ViewLocationSvc: viewService,
        $state: state, $stateParams: stateParam});

        expect(ctrl).toBeDefined();
        expect(ctrl.locId).toEqual(1);
    });

    it('must check that location details are received from backend', function() {
       var ctrl = controller('locationView', {$scope:scope, ViewLocationSvc: viewService,
        $state: state, $stateParams: stateParam});

        expect(ctrl).toBeDefined();
         viewService.getLocationDetails(1).then(function(response){
            expect(response).toBeDefined();
            expect(ctrl.cloc).toBeDefined();
            expect(ctrl.cloc.id).toEqual(1);
            expect(ctrl.cloc.barredEmployees.length).toEqual(0);
            expect(ctrl.cloc.address).toEqual("Paseo de Roxas, Makati, NCR");
           expect(ctrl.coordinates).toEqual(mockLocData.latitude + " " + mockLocData.longitude);
           expect(ctrl.duration).toEqual(mockLocData.startDate + " " + mockLocData.endDate);
           expect(ctrl.mapSource).toEqual("https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=2000x200&markers="
             + mockLocData.latitude + "," + mockLocData.longitude);
           expect(ctrl.protectiveEquipList.length).toEqual(2);
           expect(ctrl.protectiveEquipList[0]).toEqual(
             {
               name: "Bulletproof Vest",
               costType: "[One-Off Cost]"
             }
           );
        });
    });
});
