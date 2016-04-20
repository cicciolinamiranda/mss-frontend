module.exports = function (ngModule) {
  ngModule.service('AuditLogsService', auditlogsService);
};

function auditlogsService($q,$http, AUDITLOGS_GAPI_BASE) {
  var _this = this;


  return _this;
}
