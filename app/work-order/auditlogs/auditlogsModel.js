module.exports = function (ngModule) {
  ngModule.factory('AuditlogsModel', AuditlogsModel);
};
var moment = require('moment');

function AuditlogsModel(AuditLogsService) {
  var _this = this;

  function AuditlogsModel() {
    // this.postCoverChoices = setPostCoverChoices();
    // this.post = setDefaultPost();
  }

  // AuditlogsModel.prototype.getAllRoles = function () {
  //   return AuditlogsService.getAllRoles().then(function (response) {
  //     return response;
  //   });
  // };

//  AuditlogsModel.prototype.trainingChoices = [];
  return AuditlogsModel;
}
