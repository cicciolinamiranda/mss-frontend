module.exports = function (ngModule) {
  ngModule.service('AuditLogsService', auditlogsService);
};

function auditlogsService($q,$http, AUDITLOGS_GAPI_BASE) {
  var _this = this;
  var apiUrl = AUDITLOGS_GAPI_BASE + '/auditlogs';

  _this.getAuditLogs = function() {
    return $http({
      url: apiUrl,
      method: "GET"
      //params: {q: query}
    }).then(function(response) {
      return response.data;
    },function(error) {
      var errorMessage = "Error: Unable to connect to the employee search service. Please try again later.";
      return $q.reject(errorMessage);
    });
  };

  return _this;
}
