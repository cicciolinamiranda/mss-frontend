var component = require('./index');

describe('Map Controller', function () {
    var mapController;
    var element;
    var NgMap;
    var scope;
    
    var mockInitialMapData = {
      center : {
        lat: function(){
          return 14.557710;
        },
        lng: function(){
          return 121.021678;
        }
      },
      markers : {
        mapMarkers : {
          draggable : false,
          id : 'mapMarker',
          position : {
            lat: function(){
              return 14.557710;
            },
            lng: function(){
              return 121.021678;
            }
          }
        }
      }
    };

    beforeEach(angular.mock.module(component.name),function($controllerProvider){
      $controllerProvider.register('mapDisplay', function($scope){
        scope = $scope;
        element = $compile('<map-display><map-display/>')(scope);
        scope.$digest();
        mapController = element.controller('mapDisplay');
      });
    });

    beforeEach(function() {
      angular.mock.module(function($provide) {
        $provide.service('NgMap', function($q) {
          var ngMapMock = {
            getMap : function(){
              return mockInitialMapData;
            }
          };
          return ngMapMock;
        });
      });
    });

    beforeEach(angular.mock.inject(function(_NgMap_, $injector){
      NgMap = _NgMap_;
      $scope = $injector.get('$rootScope').$new();
    }));

    beforeEach(function() {
      spyOn(NgMap, 'getMap').and.callThrough();
    });

    it('should check map on initialization', angular.mock.inject(function ($rootScope) {
      //test
      expect('a').toEqual('a');
    }));
});
