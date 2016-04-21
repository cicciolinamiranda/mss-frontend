module.exports = createContractCtrl;

var moment = require('moment');

/*@ngInject*/
function createContractCtrl(CreateContractService, FileUploader, ContractModel, $state, $stateParams) {
  var _this = this;
  _this.contract = {};
  _this.files = {};
  _this.model = new ContractModel();
  _this.uploader = new FileUploader();
  _this.uploader.onAfterAddingFile = onAfterAddingFile;
  _this.uploader.onCompleteAll = onCompleteAll;
  _this.errMessage;
  _this.contactChoices;

  _this.customerId = $stateParams.customerId;
  _this.contract.customer = { id: _this.customerId };
  _this.contract.accountNumber = $stateParams.accountNumber;
  _this.customerNumber = $stateParams.customerNumber;

  _this.saveContract = saveContract;
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

    getContacts(_this.contract.accountNumber);
    initContract();
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
    CreateContractService.init().then(function (response) {
      console.log(response);
      _this.contract.id = response.id;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function getContacts(accountNumber){
    CreateContractService.getContactList(accountNumber).then(function (response){
      console.log('getContactList::', response);

      angular.forEach(response, function(value, key) {
        value['name'] = composeName(value);
      }, response);

      _this.contactChoices = response;
    }, function(error){
      _this.errMessage = error;
    });
  }

  _this.uploader.filters.push({
    name: 'extFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var mime_type = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if(item.type == mime_type[0] || item.type == mime_type[1]){
        _this.uploader.disabled = false;
      }else{
        _this.uploader.disabled = true;
      }

      if(_this.uploader.disabled){
        console.warn("Error!", "Uploaded file format is invalid.", "error");
      }else{
        return item;
      }
    }
  });

  function onAfterAddingFile(fileItem) {
    var self = this;
    console.info('onAfterAddingFile', fileItem);
    // var importfile = fileItem;
    /*CreateContractService.upload()
      .then(function(item){
        if(item.data.upload_url===undefined){
          fileItem.remove();
          _this.uploader.disabled = self.queue.length === 0;
        }
        else{
          importfile.url = item.data.upload_url;
        }
    },function(e){
      console.warn('failed');
      swal("Error!", e.data.error, "error");
    });*/
  };

  function onCompleteAll() {
    var self = this;
      console.info('onCompleteAll');
      $timeout(function () {
        var toast = self.queue.length===1 ? "file": "files";
        console.log("Success!", "CSV "+ toast + " has been uploaded and being processed by the server", "success")
        _this.uploader.disabled = true;
        self.clearQueue();
      }, 500);
  };

  function composeName(contact) {
    return camelCase(contact.salutation) + " " + contact.firstName + " " + contact.middleName + " " + contact.lastName;
  }

  function camelCase(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function goToViewContract(){
    $state.go('customer.view', {customerNumber:_this.customerNumber});
  }
}
