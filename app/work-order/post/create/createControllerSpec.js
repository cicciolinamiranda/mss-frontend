var component = require('./index');
var moment = require('moment');

describe("Create Post", function() {
  var $controller, $q, $rootScope, PostModelMock, $scope;

  var mockCreatePostSvc = {
    save: function(postDto){
        postDto.id = 1331;
        return $q.resolve({items: postDto});
    }
  };

  beforeEach(angular.mock.module(component.name));

  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.factory('PostModel', function() {
        PostModel = function(){
          this.getGenderChoices = function(){
            return $q.resolve({items: [
              {id: 1, name: 'Any'},
              {id: 2, name: 'Male'},
              {id: 3, name: 'Female'}
            ]});
          };
          this.getAllRoles = function(){
              return $q.resolve({items: [
                {id: 1, name: 'Guard'},
                {id: 2, name: 'Manager'},
                {id: 3, name: 'Supervisor'}
              ]});
            };
            this.getCallInFrequencyChoices = function(){
              return $q.resolve({items: [
                {id: 'EVERY_30_MIN', name: 'Every 30 mins'},
                {id: 'EVERY_1_HR', name: 'Every 1 hr'},
                {id: 'EVERY_2_HR', name: 'Every 2 hrs'}
              ]});
            };
            this.post= {
                customerLocationId: undefined,
                name: '',
                identificationRequired: true,
                numberOfEmployees: 1,
                startTime: moment("09:00", "HH:mm").toDate(),
                endTime: moment("17:00", "HH:mm").toDate(),
                hours: function () {
                  return moment(endTime).diff(moment(startTime), 'hours');
                },
                chargeRate: 0,
                bookOn: true,
                bookOff: true,
                callIn: true,
                notes: '',
                preferences: {
                  trainings: [],
                  languages: [],
                  physicalConditions: [],
                  qualifications: [],
                  religions: []
                },
                licenses: [],
                postSkills: [],
                uniforms: [],
                equipments: []
              };
              this.callInFrequencyChoices = [
                {id: 'EVERY_30_MIN', name: 'Every 30 mins'},
                {id: 'EVERY_1_HR', name: 'Every 1 hr'},
                {id: 'EVERY_2_HR', name: 'Every 2 hrs'}
              ];
              this.postCoverChoices=  [
                {id: 'ONE_SIX_EIGHT', name: '168 HOURS'},
                {id: 'TWENTY_FOUR_SEVEN', name: '24/7'}
              ];
          };
          return PostModel;
        });
      });
    });

  beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_, PostModel){
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    PostModelMock = PostModel;
  }));

  describe("Create Post Controller", function() {
    it("checks initial values of post on load", function() {
      var controller = $controller(require('./createController'), {
        CreatePostSvc: mockCreatePostSvc,
        PostModel: PostModelMock,
        $stateParams: {locationId: 24},
        $state: {
                  $get: function () {
                      return {
                          params: {id:1}
                      };
                  }
              },
        $scope: $rootScope.$new()
      });

      $rootScope.$digest();
      expect(controller.post).toBeDefined();
      expect(controller.post.customerLocationId).toEqual(24);
      expect(controller.post.id).toBeUndefined();
      expect(controller.post.preferences.languages).toBeDefined();
      expect(controller.post.preferences.trainings.length).toEqual(0);
    });
  });
});
