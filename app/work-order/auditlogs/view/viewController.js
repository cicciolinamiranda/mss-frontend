module.exports = viewAuditlogsCtrl;
var moment = require('moment');
/*@ngInject*/
function viewAuditlogsCtrl(AuditlogsModel) {
var _this = this;
_this.model = new AuditlogsModel();

}
