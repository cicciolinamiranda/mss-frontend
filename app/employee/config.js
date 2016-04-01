module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  // $gapiProvider.api_base = 'https://employee-be-dot-cs-javelin-mss-team-2.appspot.com/_ah/api';
  $gapiProvider.api_base = 'http://localhost:8888/_ah/api';
}
