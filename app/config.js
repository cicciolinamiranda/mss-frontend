module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($httpProvider, GAuthProvider) {
  $httpProvider.defaults.withCredentials = true;
  GAuthProvider.authUrl = 'https://employee-backend-dot-cs-javelin-mss-team-2.appspot.com/login/google';
  GAuthProvider.destinationStateOnSuccess = 'employee.list';
  GAuthProvider.destinationStateOnError = 'auth.error';
  GAuthProvider.bypassLogin = true;
}
