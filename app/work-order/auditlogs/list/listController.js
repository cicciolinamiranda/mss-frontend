module.exports = listAuditlogsCtrl;

 var moment = require('moment');

/*@ngInject*/
function listAuditlogsCtrl(AuditlogsModel) {
  var _this = this;
  _this.model = new AuditlogsModel();
  _this.objectId = 2;

  //auditlogs
  _this.auditlogsList = [];
  _this.auditlog = {}; //TODO: DO NOT NG-REPEAT MODALS :(
  _this.viewAuditlogDetails = viewAuditlogDetails;
  function init() {
    getAuditLogs();
  }

  init();
  function getAuditLogs() {
    _this.model.getAuditLogs(_this.objectType, _this.objectId).then(function (response) {
      _this.auditlogsList = response;
      console.log(_this.auditlogsList);
    });
  }

  function viewAuditlogDetails(auditlog) {
    _this.model.auditlog = auditlog;
  }
}
