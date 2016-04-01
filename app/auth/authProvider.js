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

  _this.$get = /*@ngInject*/ function($gapi,
                                      $http,
                                      $state,
                                      $log,
                                      $httpParamSerializer) {
    return {
      setUp: function() {
        return $gapi.authed.then(function() {
          return $gapi.get_auth_token();
        }).then(function(token) {
          $log.debug('Token:', token);
          return $http({
            method: 'POST',
            url: _this.authUrl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $httpParamSerializer({token: token.id_token})
          });
        }).then(function(data) {
          $log.debug('Response from backend (success):', data);
          $state.go(_this.destinationState);
        }, function(data) {
          $log.debug('Response from backend (error):', data);
          // catch error
          $log.error("Encountered an error logging in.");
        });
      }
    };
  };
}

module.exports = ngApp;
