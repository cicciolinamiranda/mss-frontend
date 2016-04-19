module.exports = function(ngModule) {
  ngModule.factory('ContractModel', contractModel);
};

function contractModel() {
  var _this = this;

  function Contract() {
    this.limitsOfLiabilityChoices = _this.limitsOfLiabilityChoices;
    this.limitsOfLiabilityDefault = this.limitsOfLiabilityChoices[0].id;

    this.standardPaymentTermsChoices = _this.standardPaymentTermsChoices;
    this.standardPaymentTermsDefault = this.standardPaymentTermsChoices[0].id;

  }

  _this.limitsOfLiabilityChoices = [
    {
      id: "250k",
      name: "250k"
    },
    {
      id: "1M",
      name: "1M"
    },
    {
      id: "2M",
      name: "2M"
    },
    {
      id: "5M",
      name: "5M"
    }
  ];

  _this.standardPaymentTermsChoices = [
    {
      id: "0",
      name: "0 Days"
    },
    {
      id: "30",
      name: "30 Days"
    },
    {
      id: "60",
      name: "60 Days"
    },
    {
      id: "90",
      name: "90 Days"
    }
  ];


  return Contract;
}
