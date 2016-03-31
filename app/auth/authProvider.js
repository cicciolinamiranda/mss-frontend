var ngApp = angular.module('GAuth', []);

ngApp.provider('GAuth', loginProvider);

function loginProvider() {
  var _this = this;

  _this.destinationState = "";

  _this.$get = function($gapi, $state) {
    return {
      setUp: function() {
        return $gapi.authed.then(function() {
          return $gapi.get_auth_token();
        }).then(function(token) {
          console.log(token);
          $state.go(_this.destinationState);
        });
      }
    };
  };
}

module.exports = ngApp;
