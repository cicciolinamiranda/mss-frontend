var component = require('./index');

describe("Post Service", function() {
  var PostService, $rootScope;
  var genderList = [
    {id: 1, name: 'Any'},
    {id: 2, name: 'Male'},
    {id: 3, name: 'Female'}
  ];
  var trainingList = [
    {id: 1, name: 'TR001'},
    {id: 2, name: 'TR002'},
    {id: 3, name: 'TR003'}
  ];
  var languageList = [
    {id: 1, name: 'Chinese'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Spanish'}
  ];
  var physConditionList = [
    {id: 1, name: 'Physcon 1'},
    {id: 2, name: 'Physcon 2'}
  ];
  var licenseList = [
    {id: 1, name: 'license 1'},
    {id: 2, name: 'license 2'}
  ];
  var postskillsList = [
    {id: 1, name: 'postskills 1'},
    {id: 2, name: 'postskills 2'}
  ];
  var equipList = [
    {id: 1, name: 'equipment 1'},
    {id: 2, name: 'equipment 2'}
  ];
  var rList = [
    {id: 1, name: 'religion 1'},
    {id: 2, name: 'religion 2'}
  ];
  var hsList = [
    {id: 1, name: 'healthsafetyrequirement 1'},
    {id: 2, name: 'healthsafetyrequirement 2'}
  ];
  var uniformList = [
    {id: 1, name: 'uniform 1'},
    {id: 2, name: 'uniform 2'}
  ];
  var qList = [
    {id: 1, name: 'qualification 1'},
    {id: 2, name: 'qualification 2'}
  ];

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
                master: {
                  file:{
                    gender:{
                      list: function(){
                        return $q.resolve({items: genderList});
                      }
                    },
                    training:{
                      list: function(){
                        return $q.resolve({items: trainingList});
                      }
                    },
                    language:{
                      list: function(){
                        return $q.resolve({items: languageList});
                      }
                    },
                    physicalcondition:{
                      list: function(){
                        return $q.resolve({items: physConditionList});
                      }
                    },
                    license:{
                      list: function(){
                        return $q.resolve({items: licenseList});
                      }
                    },
                    postskills:{
                      list: function(){
                        return $q.resolve({items: postskillsList});
                      }
                    },
                    equipment:{
                      list: function(){
                        return $q.resolve({items: equipList});
                      }
                    },
                    religion:{
                      list: function(){
                        return $q.resolve({items: rList});
                      }
                    },
                    qualification:{
                      list: function(){
                        return $q.resolve({items: qList});
                      }
                    },
                    healthsafetyrequirement: {
                      list: function(){
                        return $q.resolve({items: hsList});
                      }
                    },
                    uniform: {
                      list: function(){
                        return $q.resolve({items: uniformList});
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
  beforeEach(angular.mock.inject(function(_PostService_, _$rootScope_){
    PostService = _PostService_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    spyOn(PostService, 'getGenderValues').and.callThrough();
    spyOn(PostService, 'searchTrainings').and.callThrough();
    spyOn(PostService, 'searchLanguages').and.callThrough();
    spyOn(PostService, 'searchPhysicalConditions').and.callThrough();
    spyOn(PostService, 'getAllLicenses').and.callThrough();
    spyOn(PostService, 'getAllPostSkills').and.callThrough();
    spyOn(PostService, 'getAllUniforms').and.callThrough();
    spyOn(PostService, 'getAllEquipments').and.callThrough();
    spyOn(PostService, 'getAllHealthSafetyRequirements').and.callThrough();
    spyOn(PostService, 'getAllReligions').and.callThrough();
    spyOn(PostService, 'getAllQualifications').and.callThrough();
  });

  describe("Get lists", function() {
    it("returns a promise that resolves with gender list", function(done) {
      PostService.getGenderValues().then(function(response) {
        expect(response).toBe(genderList);
        done();
      });
      expect(PostService.getGenderValues).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with training list", function(done) {
      PostService.searchTrainings().then(function(response) {
        expect(response).toBe(trainingList);
        done();
      });
      expect(PostService.searchTrainings).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with language list", function(done) {
      PostService.searchLanguages().then(function(response) {
        expect(response).toBe(languageList);
        done();
      });
      expect(PostService.searchLanguages).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with physical condition list", function(done) {
      PostService.searchPhysicalConditions().then(function(response) {
        expect(response).toBe(physConditionList);
        done();
      });
      expect(PostService.searchPhysicalConditions).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with license list", function(done) {
      PostService.getAllLicenses().then(function(response) {
        expect(response).toBe(licenseList);
        done();
      });
      expect(PostService.getAllLicenses).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with post skills list", function(done) {
      PostService.getAllPostSkills().then(function(response) {
        expect(response).toBe(postskillsList);
        done();
      });
      expect(PostService.getAllPostSkills).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with uniform list", function(done) {
      PostService.getAllUniforms().then(function(response) {
        expect(response).toBe(uniformList);
        done();
      });
      expect(PostService.getAllUniforms).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with equipments list", function(done) {
      PostService.getAllEquipments().then(function(response) {
        expect(response).toBe(equipList);
        done();
      });
      expect(PostService.getAllEquipments).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with health and safety requirements list", function(done) {
      PostService.getAllHealthSafetyRequirements().then(function(response) {
        expect(response).toBe(hsList);
        done();
      });
      expect(PostService.getAllHealthSafetyRequirements).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with religions list", function(done) {
      PostService.getAllReligions().then(function(response) {
        expect(response).toBe(rList);
        done();
      });
      expect(PostService.getAllReligions).toHaveBeenCalled();
      $rootScope.$digest();
    });

    it("returns a promise that resolves with qualifications list", function(done) {
      PostService.getAllQualifications().then(function(response) {
        expect(response).toBe(qList);
        done();
      });
      expect(PostService.getAllQualifications).toHaveBeenCalled();
      $rootScope.$digest();
    });
  });
});
