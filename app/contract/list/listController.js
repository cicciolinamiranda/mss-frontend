module.exports = listContractCtrl;

// var moment = require('moment');

/*@ngInject*/
function listContractCtrl(ListContractService, $state) {
  var _this = this;

  function init(){
    ListContractService.list().then(function(contracts){
        _this.contracts = contracts;
    });
  }

  init();
}
