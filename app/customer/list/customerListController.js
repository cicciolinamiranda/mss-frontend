module.exports = listCustomerCtrl;

// var moment = require('moment');

/*@ngInject*/
function listCustomerCtrl(CustomerListService, $state) {
  var _this = this;
  _this.customers = [];

  function init() {
    CustomerListService.list().then(function(customers){
      _this.customers = customers;
    });
  }

  init();
}
