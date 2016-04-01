require('eydis-gapi');
require('angular-ui-router');

var ngApp = angular.module('GAuth', [
  'eydis.gapi',
  'ui.router'
]);

ngApp.provider('GAuth', loginProvider);

function loginProvider() {
  var _this = this;
  var STATUS = {
    FAILED: -1,
    PENDING: 0,
    SUCCESS: 1
  };

  _this.authUrl = "";
  _this.destinationStateOnSuccess = "";
  _this.destinationStateOnError = "";

  _this.$get = /*@ngInject*/ function($gapi,
                                      $http,
                                      $state,
                                      $log,
                                      $httpParamSerializer) {
    return {
      status: STATUS.PENDING,
      setUp: (function() {
        this.status = STATUS.PENDING;
        return $gapi.authed.then(function() {
          return $gapi.get_auth_token();
        }).then(function(token) {
          $log.debug('Token:', token);
          // TODO: check if session already exists
          return $http({
            method: 'POST',
            url: _this.authUrl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $httpParamSerializer({token: token.id_token})
          });
        }).then(function(data) {
          this.status = STATUS.SUCCESS;
          $log.debug('Response from backend (success):', data);
          $log.info("Successfully logged in.");
          return $state.go(_this.destinationStateOnSuccess);
        }, function(data) {
          this.status = STATUS.FAILED;
          $log.debug('Response from backend (error):', data);
          $log.error("Encountered an error logging in.");
          return $state.go(_this.destinationStateOnError);
        });
      }).bind(this)
    };
  };
}

module.exports = ngApp;
