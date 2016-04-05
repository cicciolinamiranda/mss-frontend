module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($httpProvider, GAuthProvider) {
  $httpProvider.defaults.withCredentials = true;
  GAuthProvider.authUrl = 'https://javelin-qa.appspot.com/login/google';
  GAuthProvider.destinationStateOnSuccess = 'employee.list';
  GAuthProvider.destinationStateOnError = 'auth.error';
}
