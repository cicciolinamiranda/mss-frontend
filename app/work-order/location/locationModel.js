module.exports = function(ngModule) {
  ngModule.factory('LocationModel', locationModel);
};

function locationModel() {
  var _this = this;

  function Location() {
    this.costTypeChoices = _this.costTypeChoices;
    this.costTypeDefault = this.costTypeChoices[0].id;
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

  return Location;
}
