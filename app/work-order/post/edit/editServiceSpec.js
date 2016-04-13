var component = require('./index');

describe("Edit Service", function() {
  var EditPostSvc, $rootScope;
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
  var saveDto = {
    'customerLocationId': 24,
    'name': "Post Name"
  };

  var editDto = {
    'id': 13331,
    'customerLocationId': 24,
    'name': "Edit Post Name"
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
                        get: function(id){
                          if (id === 1331) {
                            return $q.resolve(mockPost);
                          } else {
                            return $q.reject('Post not found');
                          }
                        },
                        update: function(postDto){
                          return $q.resolve(postDto);
                        },
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

  beforeEach(angular.mock.inject(function(_EditPostSvc_, _$rootScope_){
    EditPostSvc = _EditPostSvc_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(EditPostSvc, 'getPostDetailsById').and.callThrough();
    spyOn(EditPostSvc, 'update').and.callThrough();
    spyOn(EditPostSvc, 'save').and.callThrough();
  });

  describe("Get post details", function() {
    it("returns a promise that resolves with post details", function() {
      EditPostSvc.getPostDetailsById(1331).then(function(response) {
        expect(response).toBe(mockPost);
      });
      expect(EditPostSvc.getPostDetailsById).toHaveBeenCalledWith(1331);
      $rootScope.$digest();
    });
  });

  describe("Update Post Details", function() {
    it("returns a promise that resolves with post details", function() {
      EditPostSvc.update(editDto).then(function(response) {
        var post = response;
        expect(post.id).toEqual(13331);
        expect(post.customerLocationId).toEqual(24);
        expect(post.name).toEqual("Edit Post Name");
      });
      expect(EditPostSvc.update).toHaveBeenCalledWith(editDto);
      $rootScope.$digest();
    });
  });

  describe("Duplicate Post details", function() {
    it("returns a promise that resolves with post details", function() {
      EditPostSvc.save(saveDto).then(function(response) {
        var post = response;
        expect(post.id).toEqual(1332);
        expect(post.customerLocationId).toEqual(24);
        expect(post.name).toEqual("Post Name");
      });
      expect(EditPostSvc.save).toHaveBeenCalledWith(saveDto);
      $rootScope.$digest();
    });
  });

});
