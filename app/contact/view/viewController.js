module.exports = viewContactCtrl;

// var moment = require('moment');

/*@ngInject*/
function viewContactCtrl(ViewContactService, $state, $stateParams) {
  var _this = this;
  _this.contactId = $stateParams.contactId;

  function init(){

  }

  init();
}
