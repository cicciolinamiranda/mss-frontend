module.exports = function (ngModule) {
  ngModule.service('AuditLogsService', auditlogsService);
};

function auditlogsService($q,$http, AUDITLOGS_GAPI_BASE) {
  var _this = this;
  var apiUrl = AUDITLOGS_GAPI_BASE + 'reports/v1/auditlog/';

  _this.getAuditLogs = function(objectType, objectId) {
    return $http({
      url: apiUrl + objectType + "/list/" + objectId,
      method: "GET"
    }).then(function(response) {
      return response.data;
    },function(error) {
      var errorMessage = "Error: Unable to connect to the audit log service. Please try again later.";
      return $q.reject(errorMessage);
    });
  };

  return _this;
}
