var component = require('./index');

describe("View Service", function() {
  var ViewPostSvc, $rootScope;
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
  }

  beforeEach(angular.mock.module(component.name));

  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.constant('WORKORDER_GAPI_BASE', '');
      $provide.service('$gapi', function($q) {
        var gapi = {
            loaded: $q.resolve(),
            load: function() {
              return $q.resolve();
            },
            client: {
              customerContract: {
                workorder: {
                  customer: {
                    location:{
                      post:{
                        get: function(id){
                          if (id === 1331) {
                            return $q.resolve(mockPost);
                          } else {
                            return $q.reject('Post not found');
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
          return gapi;
        });
      });
    });

  beforeEach(angular.mock.inject(function(_ViewPostSvc_, _$rootScope_){
    ViewPostSvc = _ViewPostSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(ViewPostSvc, 'getPostDetailsById').and.callThrough();
  });

  describe("Get post details", function() {
    it("returns a promise that resolves with post details", function() {
      ViewPostSvc.getPostDetailsById(1331).then(function(response) {
        expect(response).toBe(mockPost);
      });
      expect(ViewPostSvc.getPostDetailsById).toHaveBeenCalledWith(1331);
      $rootScope.$digest();
    });

  });
});
