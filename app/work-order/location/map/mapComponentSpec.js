var component = require('./index');

describe('Map Controller', function () {
    var mapController;
    var element;
    var NgMap;
    var scope;
    var $compile,$rootScope;

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

    var Map = {
        showInfoWindow: function() {},
        setCenter: function() {},
        fitBounds: function() {}
      },
      $controller,
      mockFacilityData = {
        meta: {
          offset: 0,
          limit: 25,
          total: 2
        },
        data: [
          {id: 123},
          {id: 234}
        ]
      },
      google = {
        maps: {
          LatLngBounds: function() {
            this.extend = function() {};
            this.getCenter = function() {};
          },
          LatLng: function() {}
        }
      };

    //this line is conflicting with controller def
    beforeEach(angular.mock.module(component.name));

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
      scope = $injector.get('$rootScope').$new();
    }));

    beforeEach(function() {
      spyOn(NgMap, 'getMap').and.callFake(function() {
          return {
            then: function(callback) {
              callback(Map);
            }
          };
        });
    });

    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should check map on initialization', angular.mock.inject(function () {
      var element = $compile("<map-display><map-display/>");
        mapController = component.controller;
        //expect(element.html()).toContain("A");

    }));
});
