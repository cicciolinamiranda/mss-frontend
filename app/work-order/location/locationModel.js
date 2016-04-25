module.exports = function(ngModule) {
  ngModule.factory('LocationModel', locationModel);
};

function locationModel(CreateLocationSvc,EditLocationSvc,$state) {
  var _this = this;
    _this.errMessage - "";
  function Location() {
    this.costTypeChoices = _this.costTypeChoices;
    this.costTypeDefault = this.costTypeChoices[0].id;
    this.save = _this.save;
    this.update = _this.update;
    this.errMessage = _this.errMessage;
  }

  _this.costTypeChoices = [
    {
      id: "ONE_OFF_COST",
      name: "One-Off Cost"
    },
    {
      id: "FIXED_RATE",
      name: "Fixed Rate"
    }
  ];

  _this.save = function(customerLocationDetails) {
      CreateLocationSvc.save(customerLocationDetails).then(function (response) {
        _this.customerLocationId = response.id;
        $state.go('location.view', {id: _this.customerLocationId});
      }, function (error) {
        _this.errMessage = error;
      });
  };

  _this.update = function(customerLocationDetails) {
    EditLocationSvc.update(customerLocationDetails).then(function (response) {
      _this.customerLocationId = response.id
        $state.go('location.view', {id: _this.customerLocationId});
    }, function (error) {
      _this.errMessage= error;
    });
  }

  return Location;
}
