require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('GAuth', [
  'eydis.gapi',
  'ui.router'
]);

ngApp.provider('GAuth', loginProvider);

function loginProvider() {
  var _this = this;

  _this.authUrl = "";
  _this.destinationState = "";

  _this.$get = /*@ngInject*/ function($gapi, $http, $state) {
    return {
      setUp: function() {
        return $gapi.authed.then(function() {
          return $gapi.get_auth_token();
        }).then(function(token) {
          return $http.post(_this.authUrl);
        }).then(function() {
          $state.go(_this.destinationState);
        }, function() {
          // catch error
          $state.go(_this.destinationState);
        });
      }
    };
  };
}

module.exports = ngApp;
