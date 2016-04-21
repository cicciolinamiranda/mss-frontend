var component = require('./index');
var moment = require('moment');

describe("Edit Post", function() {
  var $controller, $q, $rootScope, PostModelMock, EditPostModel;

  var mockPost = {
    id: 1331,
    customerLocationId: 24,
    name: "Post",
    numberOfEmployees: 6,
    preferences: {
      gender: {
        id: 1,
        name: "Female"
      },
      languages: [
        {id: 1, name: 'English'},
        {id: 4, name: 'Greek'}
      ]
    }
  };

  var mockEditPostSvc = {
    getPostDetailsById: function(id){
      if (id === 1331) {
        return $q.resolve(mockPost);
      } else {
        return $q.reject('Post not found');
      }
    },
    update: function(post){
      return $q.resolve(post);
    },
    save: function(post){
      postDto.id = 1332;
      return $q.resolve(post);
    }
  };

  beforeEach(angular.mock.module(component.name));

  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.provider('$state', function () {
            return {
                $get: function () {
                    return {
                        params: {id:1}
                    };
                }
            };
        });

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

        $provide.factory('EditPostSvc', function() {
            return mockEditPostSvc;
        });

        $provide.factory('EditPostModel', function($state, EditPostSvc, PostModel) {
          EditPostModel = function(){
            this.getPostDetails = function(id){
              if (id === 1331) {
                return $q.resolve(mockPost);
              } else {
                return $q.reject('Post not found');
              }
            };
          };
          return EditPostModel;
        });
      });
    });

  beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_, PostModel, EditPostModel){
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    PostModelMock = PostModel;
    EditPostModel = EditPostModel;
  }));

  beforeEach(function() {
    //spyOn(EditPostModel, 'getPostDetails').and.callThrough();
    // spyOn(EditPostModel, 'getPostDetails').and.returnValue(
    //   $q.when(mockPost));
  });

  describe("Edit Post Controller", function() {
    it("checks edit transaction on load", function() {
      var controller = $controller(require('./editController'), {
        EditPostSvc: mockEditPostSvc,
        PostModel: PostModelMock,
        EditPostModel: EditPostModel,
        $stateParams: {locationId: 24, transaction: 'e', id: 1402},
        $state: {
                  $get: function () {
                      return {
                      };
                  }
              },
        $scope: $rootScope.$new()
      });
      $rootScope.$digest();
      expect(controller.postModel).toBeDefined();
      expect(controller.model).toBeDefined();
      expect(controller.postModel.callInFrequencyChoices.length).toEqual(3);
    });
  });
});
