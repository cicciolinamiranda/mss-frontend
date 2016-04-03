require('eydis-gapi');
require('angular-ui-router');
require('angular-cookies');

var ngApp = angular.module('GAuth', [
  'eydis.gapi',
  'ui.router',
  'ngCookies'
]);

var STATUS = {
  NOT_LOGGED_IN: -3,
  STAGNANT: -2,
  FAILED: -1,
  PENDING: 0,
  SUCCESS: 1
};

ngApp.provider('GAuth', loginProvider);

ngApp.run(function($rootScope, $urlRouter, GAuth, $state, $gapi, $location) {
  $rootScope.waitingForAsync = false;
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {
    if (next.name.indexOf('auth') < 0 && !GAuth.isLoggedIn()) {
      event.preventDefault();
      if (!$rootScope.waitingForAsync) {
        $rootScope.waitingForAsync = true;
        (GAuth.loginInProgress() ? GAuth.loginPromise :
          GAuth.googleLogin(true))
          .then(
            function() { return $state.go(next.name, nextParams); },
            function() { return GAuth.goToErrorPage(); }
          )
          .then(function() {
            $rootScope.waitingForAsync = false;
          });
      }
    }
  });
});

function loginProvider() {
  var _this = this;

  _this.authUrl = "";
  _this.destinationStateOnSuccess = "";
  _this.destinationStateOnError = "";

  _this.$get = /*@ngInject*/ function($q,
                                      $gapi,
                                      $log,
                                      $cookies,
                                      $http,
                                      $httpParamSerializer,
                                      $state) {
    function GAuth() {
      var deferred = $q.defer();
      this.loginPromise = deferred.promise;
      this.status = STATUS.STAGNANT;
      this.setUp = setUp;
      this.googleLogin = googleLogin;
      this.isLoggedIn = isLoggedIn;
      this.loginInProgress = loginInProgress;
      this.getStatus = getStatus;
      this.goToSuccessPage = loginSuccessHandler;
      this.goToErrorPage = loginErrorHandler;

      function setUp() {
        this.googleLogin().then(loginSuccessHandler, loginErrorHandler);
      }

      function googleLogin(redirect) {
        console.log(redirect);
        this.status = STATUS.PENDING;

        return $gapi.loaded
          .then((function(result) {
            if (!result) this.status = STATUS.NOT_LOGGED_IN;
            if (redirect && this.status == STATUS.NOT_LOGGED_IN)
              $state.go('auth.login', {willRedirect: true});
            return $gapi.authed;
          }).bind(this))
          .then(function() {
            return $gapi.get_auth_token();
          })
          .then(function(token) {
            $log.debug('Token:', token);

            // TODO: check if session already exists
            $log.debug($cookies.getAll());

            return $http({
              method: 'POST',
              url: _this.authUrl,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: $httpParamSerializer({token: token.id_token})
            });
          })
          .then((function(data) {
            deferred.resolve();
            this.status = STATUS.SUCCESS;
            $log.debug('Response from backend (success):', data);
            $log.info("Successfully logged in.");
            return $q.resolve();
          }).bind(this), (function(data) {
            deferred.reject();
            this.status = STATUS.FAILED;
            $log.debug('Response from backend (error):', data);
            $log.error("Encountered an error logging in.");
            return $q.reject();
          }).bind(this));
      }

      function isLoggedIn() {
        return this.status == STATUS.SUCCESS;
      }

      function loginInProgress() {
        return this.status == STATUS.PENDING;
      }

      function getStatus() {
        return this.status;
      }

      function loginSuccessHandler() {
        return $state.go(_this.destinationStateOnSuccess);
      }

      function loginErrorHandler() {
        return $state.go(_this.destinationStateOnError, {}, {location: false});
      }
    }
    return new GAuth();
  };
}

module.exports = ngApp;
