module.exports = listAuditlogsCtrl;

 var moment = require('moment');

/*@ngInject*/
function listAuditlogsCtrl(AuditlogsModel) {
  var _this = this;
  _this.model = new AuditlogsModel();

  //auditlogs
  _this.auditlogsList = [];

  function init() {
    getAuditLogs();
  }

  init();
  function getAuditLogs() {
    _this.model.getAuditLogs().then(function (response) {
      for(i=0; i < response.length; i++){

        if(response[i].objectType == _this.objectType) {
          _this.auditlogsList.push(response[i]);
        }

        console.log("CONTROLLER--> "+JSON.stringify(_this.auditlogsList));
    }
    });
  }
}
