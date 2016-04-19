module.exports = viewCustomerCtrl;

// var moment = require('moment');

/*@ngInject*/
function viewCustomerCtrl($q, CustomerViewService, ListContactService, $stateParams, $state) {
  var _this = this;
  _this.customerNumber = $stateParams.customerNumber;
  _this.customer = {};
  _this.contacts = [];
  _this.composeName = composeName;

  function init() {
    CustomerViewService.get(_this.customerNumber).then(function(customer){
      angular.extend(_this.customer, customer);
      getContactByAccountNumber(_this.customer.accountNumber);
      getCustomerContracts(_this.customer.id);
    });
  }

  function getCustomerContracts(customerId){
    CustomerViewService.getCustomerContracts(_this.customerId).then(function(contracts){
      angular.extend(_this.customerContracts = contracts);
    });
  }

  function getContactByAccountNumber(accountNumber){
    ListContactService.getByAccountNumber(accountNumber).then(function(contacts){
      angular.extend(_this.contacts, contacts);
    });
  }
  function composeName(contact) {
    return contact.salutation + " " + contact.firstName + " " + contact.middleName + " " + contact.lastName;
  }

init();
}
