module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($httpProvider, GAuthProvider) {
  $httpProvider.defaults.withCredentials = true;
  // GAuthProvider.authUrl = 'https://employee-dot-javelin-dev.appspot.com/login/google';
  GAuthProvider.authUrl = 'http://localhost:8081/login/google';
  GAuthProvider.destinationStateOnSuccess = 'employee.list';
  GAuthProvider.destinationStateOnError = 'auth.error';
  GAuthProvider.bypassLogin = false;
}
