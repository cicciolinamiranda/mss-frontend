var component = require('./index');

var sample_searchTerm;

describe("Global Search Component", function() {
  var $compile, $rootScope;

  beforeEach(angular.mock.module(component.name));
  beforeEach(function(){
    angular.mock.module(function($provide){
      $provide.provider('$state',function(){
        return {
          $get: function() {
            return {
              params: {searchTerm:'b'}
            };
          }
        };
        $provide.value('$state',{
          searchTerm: sample_searchTerm;
        })
      });
    });
  });
  beforeEach(angular.mock.inject(function(_$compile_,_$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it("accepts a search item with less than 2 characters", function() {
    $rootScope.model = { searchTerm: null };
    var globalSearch = $compile('<global-search></global-search>')($rootScope);
    console.log(globalSearch.html());
    expect(globalSearch.html()).toContain('ng-minlength="2"');
    expect(globalSearch.html()).toContain("Your field is too short");
  });
});
