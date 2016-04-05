module.exports = function(ngModule) {
  ngModule.service('EmployeeLookupSvc', lookupService);
};

function lookupService($q,$http, WORKORDER_MOCK_BASE) {
  var apiUrl = WORKORDER_MOCK_BASE + '/employees';

  this.search = function(query) {
    return $http({
      url: apiUrl,
      method: "GET",
      params: {q: query}
    }).then(function(response) {
      return response.data;
    },function(error) {
      var errorMessage = "Error: Unable to connect to the employee search service. Please try again later.";
      return $q.reject(errorMessage);
    });
  };
}
