module.exports = createContractCtrl;

var moment = require('moment');

/*@ngInject*/
function createContractCtrl(CreateContractService, ContractModel, $state, $stateParams) {
  var _this = this;
  _this.contract = {};
  _this.model = new ContractModel();
  _this.errMessage;

  _this.customerId = $stateParams.customerId;
  _this.contract.customer = { id: _this.customerId };
  _this.contract.accountNumber = $stateParams.accountNumber;
  _this.customerNumber = $stateParams.customerNumber;

  _this.saveContract = saveContract;
  _this.getContactList = getContactList;
  _this.goToViewContract = goToViewContract;

  function init(){
    _this.contract.id = null;
    _this.contract.number = null;
    _this.contract.name = null;
    _this.contract.startDate = moment().toDate();
    _this.contract.endDate = moment().toDate();
    _this.contract.title = "";
    _this.contract.reviewDate = moment().toDate();
    _this.contract.signedDate = moment().toDate();
    _this.contract.value = 0.00;
    _this.contract.wefDate = moment().toDate();
    _this.contract.limitsOfLiability = null;
    _this.contract.standardPaymentTerms = 0;
    _this.contract.manualContactNumber = 0;
    _this.contract.customerSigningAuthority = "";
    _this.contract.designationAuthority = "";
    _this.contract.loiDate = moment().toDate();
    _this.contract.loiStartDate = moment().toDate();
    _this.contract.loiEndDate = moment().toDate();
    _this.contract.issuingAuthority = "";

    _this.limitsOfLiabilityChoices = _this.model.limitsOfLiabilityChoices;
    _this.limitsOfLiabilityDefault = _this.model.limitsOfLiabilityDefault;

    _this.standardPaymentTermsChoices = _this.model.standardPaymentTermsChoices;
    _this.standardPaymentTermsDefault = _this.model.standardPaymentTermsDefault;

    initContract();
    getContactList();
  }

  init();

  function saveContract(){
    CreateContractService.save(_this.contract).then(function (response) {
      _this.contractId = response.id;
      goToViewContract();
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function initContract(){
    console.log("initializing contract...");
    CreateContractService.init().then(function (response) {
      console.log(response);
      _this.contract.id = response.id;
      goToViewContract();
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function getContactList(){
    _this.contactChoices = [
      {
        id: 'richmond',
        name: 'Rich'
      }
    ];
    /*CreateContractService.getContactList().then(function (response) {
      _this.contactChoices = response;

    }, function (error) {
      _this.errMessage = error;
    });*/
  }

  function goToViewContract(){
    $state.go('customer.view', {customerNumber:_this.customerNumber});
  }
}
