module.exports = function(ngModule) {
  ngModule.provider('GAuth', loginProvider);
};

function loginProvider() {
  var _this = this;
  _this.destinationState = "";
  _this.$get = function($state) {
    return {
      go: function() {
        $state.go(_this.destinationState);
      }
    };
  };
}
