module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($httpProvider, GAuthProvider) {
  $httpProvider.defaults.withCredentials = true;
  GAuthProvider.authUrl = 'https://employee-be-dot-cs-javelin-mss-team-2.appspot.com/login/google';
  GAuthProvider.destinationState = 'employee.list';
}
