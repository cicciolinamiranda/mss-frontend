module.exports = loginCtrl;

/*@ngInject*/ function loginCtrl($gapi, GAuth) {
  var _this = this;

  function init() {
    _this.signin = $gapi.signin;
    GAuth.setUp(); // hook callbacks on auth success
  }

  init();
}
