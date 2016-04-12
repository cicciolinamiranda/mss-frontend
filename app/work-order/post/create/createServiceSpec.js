var component = require('./index');

describe("Edit Service", function() {
  var CreatePostSvc, $rootScope;
  var saveDto = {
    'customerLocationId': 24,
    'name': "Post Name"
  };

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
                        save: function(postDto){
                          postDto.id = 1332;
                          return $q.resolve(postDto);
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

  beforeEach(angular.mock.inject(function(_CreatePostSvc_, _$rootScope_){
    CreatePostSvc = _CreatePostSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(CreatePostSvc, 'save').and.callThrough();
  });

  describe("Save Post details", function() {
    it("returns a promise that resolves with post details", function() {
      CreatePostSvc.save(saveDto).then(function(response) {
        var post = response;
        expect(post.id).toEqual(1332);
        expect(post.customerLocationId).toEqual(24);
        expect(post.name).toEqual("Post Name");
      });
      expect(CreatePostSvc.save).toHaveBeenCalledWith(saveDto);
      $rootScope.$digest();
    });
  });

});
