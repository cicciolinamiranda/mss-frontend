module.exports = function(ngModule) {
  ngModule.config(config);
}

function config($gapiProvider) {
  "ngInject";
  $gapiProvider.api_base = 'https://cs-javelin-mss-team-2.appspot.com/_ah/api';
}
