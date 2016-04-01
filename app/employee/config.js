module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  $gapiProvider.api_base = 'https://employee-backend-dot-cs-javelin-mss-team-2.appspot.com/_ah/api';
}
