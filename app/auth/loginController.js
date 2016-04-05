module.exports = loginCtrl;

/*@ngInject*/ function loginCtrl($gapi, GAuth, $stateParams) {
  var _this = this;

  function init() {
    _this.signin = $gapi.signin;
    if (GAuth.isLoggedIn()) {
      GAuth.goToSuccessPage();
    }
    else if (!$stateParams.willRedirect) {
      GAuth.setUp(); // hook callbacks on auth success
    }
  }

  init();
}
