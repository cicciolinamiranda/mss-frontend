module.exports = createContactCtrl;

var moment = require('moment');

/*@ngInject*/
function createContactCtrl(CreateContactService, $state, $stateParams) {
  var _this = this;
  _this.contact = {};
  _this.errMessage;
  _this.saveContact = saveContact;
  _this.goToViewContacts = goToViewContacts;
  _this.account_number = $stateParams.accountNumber;
  _this.customer_number = $stateParams.customerNumber;
  _this.id = $stateParams.id;

  function init(){
    _this.contact.contactAccountNumber = _this.account_number;
    _this.contact.customer = {
      id: _this.id,
      accountNumber: _this.account_number
    };
    _this.contact.salutation = '';
    _this.contact.firstName = '';
    _this.contact.middleName = '';
    _this.contact.lastName = '';
    _this.contact.jobTitle = '';
    _this.contact.phone1 = '';
    _this.contact.phone2 = '';
    _this.contact.mobile = '';
    _this.contact.email = '';
    _this.contact.fax = '';
    _this.contact.primaryContact = '';
    _this.contact.inactive = '';
  }

  init();

  function saveContact(){
    CreateContactService.save(_this.contact).then(function (response) {
      _this.contactId = response.id;
      $state.go('customer.view', {customerNumber: _this.customer_number});
    }, function (error) {
      _this.errMessage = error;
    });
  }

  function goToViewContacts(){
    $state.go('customer.view', {customerNumber: _this.customer_number});
  }
}
