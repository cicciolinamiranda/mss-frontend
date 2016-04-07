module.exports = function(ngModule) {
  ngModule.factory('LocationModel', locationModel);
};

function locationModel() {
  var _this = this;

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
  _this.costTypeDefault = _this.costTypeChoices[0].id;

  return _this;
}
