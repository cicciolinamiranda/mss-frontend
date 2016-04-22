module.exports = function (ngModule) {
  ngModule.factory('AuditlogsModel', AuditlogsModel);
};
var moment = require('moment');

function AuditlogsModel(AuditLogsService) {
  function AuditlogsModel() {
  }

  AuditlogsModel.prototype.auditlog = {};
  AuditlogsModel.prototype.getAuditLogs = function (objectId, objectType) {
    return AuditLogsService.getAuditLogs(objectId,objectType).then(function (response) {
      return AuditlogsModel.formatDtoToJson(response);
    });
  };

  AuditlogsModel.formatDtoToJson = function(dtoList){
    var json = dtoList;

    for(i=0;i<json.length;i++) {
      if(json[i].body){
        try
        {
          json[i].body = JSON.parse(json[i].body);
        }
        catch(e)
        {
          json[i].body = [];
        }
      }
      json[i].revision_date = AuditlogsModel.transformJodaTimeToDateString(json[i].revision_date);
    }
    return json;
  }

  AuditlogsModel.transformJodaTimeToDateString = function(datetime) {
    return moment(datetime).format('MM/DD/YYYY h:mm a');
  }

  return AuditlogsModel;
}
