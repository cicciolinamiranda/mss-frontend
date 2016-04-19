module.exports = listContactCtrl;

// var moment = require('moment');

/*@ngInject*/
function listContactCtrl(ListContactService, $state) {
  var _this = this;

  function init(){
    ListContactService.list().then(function(contacts){
        _this.contacts = contacts;
    });
  }

  init();
}
