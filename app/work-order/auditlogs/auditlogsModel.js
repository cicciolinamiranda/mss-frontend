module.exports = function (ngModule) {
  ngModule.factory('AuditlogsModel', AuditlogsModel);
};
var moment = require('moment');

function AuditlogsModel(AuditLogsService) {
  function AuditlogsModel() {
  }

  AuditlogsModel.prototype.auditlog = {};
  AuditlogsModel.prototype.getAuditLogs = function () {
    return AuditLogsService.getAuditLogs().then(function (response) {
      return AuditlogsModel.formatDtoToJson(response);
    });
  };

  AuditlogsModel.formatDtoToJson = function(dtoList){
    var json = dtoList;

    for(i=0;i<json.length;i++) {
      json[i].createdDateStr = AuditlogsModel.transformJodaTimeToDateString(json[i].createdDate);
    }
    return json;
  }

  AuditlogsModel.transformJodaTimeToDateString = function(jodatime) {
    var date = "";
      if(undefined !== jodatime) {
        date = jodatime.monthOfYear+"/"+jodatime.dayOfMonth+"/"+jodatime.year;
      }
    return date;
  }

  return AuditlogsModel;
}
