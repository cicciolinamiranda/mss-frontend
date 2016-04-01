module.exports = function(ngModule) {
  ngModule.service('SearchResultsSvc', resultsService);
};

function resultsService($q,$http) {
  var apiUrl = 'http://localhost:3000/employees';

  this.search = function(query) {
    
  };
}
