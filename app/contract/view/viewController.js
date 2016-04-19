module.exports = viewContractCtrl;

// var moment = require('moment');

/*@ngInject*/
function viewContractCtrl(ViewContractService, $state, $stateParams) {
  var _this = this;
  _this.contractNumber = $stateParams.contractNumber;
  _this.goToViewLocation = goToViewLocation;

  function init(){
    ViewContractService.get(_this.contractNumber).then(function(contract){
        _this.contract = contract;
    });
  }

  init();

  function goToViewLocation(id){
    $state.go('contract.view', {contractNumber: id});
  }
}
