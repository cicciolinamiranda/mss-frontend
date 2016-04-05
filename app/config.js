module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($httpProvider, GAuthProvider) {
  $httpProvider.defaults.withCredentials = true;
  GAuthProvider.authUrl = 'https://employee-backend-dot-javelin-qa.appspot.com/login/google';
  GAuthProvider.destinationStateOnSuccess = 'employee.list';
  GAuthProvider.destinationStateOnError = 'auth.error';
}
